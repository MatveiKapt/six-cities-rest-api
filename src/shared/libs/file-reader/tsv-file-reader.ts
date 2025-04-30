import { EventEmitter } from 'node:events';
import { Offer, OfferAmenities, OfferType } from '../../types/index.js';
import { FileReader } from './file-reader.interface.js';
import fs from 'node:fs';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private readonly filePath: string,
  ) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createdAt,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      amenities,
      authorId,
      commentsCount,
    ] = line.split('\t');

    return {
      title,
      description,
      createdAt: new Date(createdAt),
      city,
      previewImage,
      images: images.split(';'),
      isPremium: isPremium === 'true',
      isFavorite: isFavorite === 'true',
      rating: Number(rating),
      type: type as OfferType,
      rooms: Number(rooms),
      guests: Number(guests),
      price: Number(price),
      amenities: amenities.split(';') as OfferAmenities[],
      authorId,
      commentsCount: Number(commentsCount),
    };
  }

  public async read() {
    const readStream = fs.createReadStream(this.filePath, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
