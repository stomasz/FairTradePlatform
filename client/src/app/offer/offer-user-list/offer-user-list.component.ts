import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/_models/offer';
import { OffersService } from 'src/app/_services/offers.service';

@Component({
  selector: 'app-offer-user-list',
  templateUrl: './offer-user-list.component.html',
  styleUrls: ['./offer-user-list.component.css']
})
export class OfferUserListComponent implements OnInit {
  offers: Offer[];

  constructor(private offerService: OffersService) { }

  ngOnInit(): void {
    this.loadUserOffer();
  }

  loadUserOffer(){
    this.offerService.getUserOffers().subscribe(offers =>{
      this.offers = offers;
    })
  }

}
