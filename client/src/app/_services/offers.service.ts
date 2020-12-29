import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Offer } from '../_models/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  baseUrl = environment.apiUrl;
  offers: Offer[] = [];

  constructor(private http: HttpClient) { }

  getOffers() {
    return this.http.get<Offer[]>(this.baseUrl + 'offer')
  }

  getUserOffers() {
    return this.http.get<Offer[]>(this.baseUrl + 'offer/user');
  }

  getOfferCategories() {
    return this.http.get<Offer[]>(this.baseUrl + 'offer/categories');
  }

  getOfferDetails(id) {
    return this.http.get<Offer>(this.baseUrl + 'offer/' + id);
  }

  updateOffer(offer: Offer) {
    return this.http.put(this.baseUrl + 'offer/edit', offer);
  }

  addOffer(offer: Offer) {
    return this.http.post(this.baseUrl + 'offer', offer);
  }

  setMainPhoto(offerId: number, photoId: number) {
    return this.http.put(this.baseUrl + 'offer/set-main-photo/' + offerId + '/' + photoId, {});
  }

  deletePhoto(offerId: number, photoId: number) {
    return this.http.delete(this.baseUrl + 'offer/delete-photo/' + offerId + '/' + photoId, {});
  }



}
