import { OfferPhoto } from './offerPhoto';

export interface Offer {
    id: number;
    photoUrl: string;
    category: string;
    user: string;
    title: string;
    description: string;
    shipingTimeInDays: number;
    minUnits: number;
    unitType: string;
    unitPrice: number;
    created: Date;
    offerPhotos: OfferPhoto[];
  }
  
  