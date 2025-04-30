import { OfferAmenities } from '../enums/offer-amenitites.enum.js';
import { OfferType } from '../enums/offer-type.enum.js';

export type Offer = {
  title: string;
  description: string;
  createdAt: Date;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  amenities: OfferAmenities[];
  authorId: string;
  commentsCount: number;
};
