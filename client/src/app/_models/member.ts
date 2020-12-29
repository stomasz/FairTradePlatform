import { AppUserPhoto } from "./memberPhoto";
import { Offer } from "./offer";

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    created: Date;
    email: string;
    phoneNumber: string;
    otherContact: string;
    companyName: string;
    country: string;
    city: string;
    description: string;
    offers: Offer[];
    appUserPhotos: AppUserPhoto[];
  }
  

