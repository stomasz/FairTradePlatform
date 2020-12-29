import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/_models/offer';
import { AccountService } from 'src/app/_services/account.service';
import { OffersService } from 'src/app/_services/offers.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  offers: Offer[];

  constructor(private offersService: OffersService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.offersService.getOffers().subscribe(offers => {
      this.offers = offers
    })
  }
}
