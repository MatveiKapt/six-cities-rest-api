import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Offer } from '../../shared/types/index.js';

export class ImportCommand implements Command {
  private onImportedOffer(offer: Offer): void {
    console.log(offer);
  }

  private onCompletedImport(count: number): void {
    console.log(`${count} rows imported.`);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filePath] = parameters;
    const tsvFileReader = new TSVFileReader(filePath.trim());

    tsvFileReader.on('line', this.onImportedOffer);
    tsvFileReader.on('end', this.onCompletedImport);

    try {
      await tsvFileReader.read();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      console.error(`Can't import data from file: ${filePath}`);
      console.error(`Details: ${error}`);
    }
  }
}
