import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { getRandomItem, generateRandomValue, getRandomBoolean, getRandomItems } from '../../helpers/index.js';
import { MockServerData } from '../../types/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_ADULTS = 1;
const MAX_ADULTS = 5;

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 3;


export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: MockServerData
  ) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const createdAt = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.images);
    const images = getRandomItems(this.mockData.images).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const type = getRandomItem(this.mockData.types);
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS);
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const goods = getRandomItems(this.mockData.goods).join(';');
    const hostId = generateRandomValue(1, this.mockData.users.length);
    const commentsCount = generateRandomValue(0, 100);
    const latitude = generateRandomValue(35, 55, 5);
    const longitude = generateRandomValue(35, 55, 5);

    return [
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
      bedrooms,
      maxAdults,
      price,
      goods,
      hostId,
      commentsCount,
      latitude,
      longitude
    ].join('\t');
  }
}

