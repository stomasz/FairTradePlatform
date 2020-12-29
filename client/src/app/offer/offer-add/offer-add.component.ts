import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/_models/offer';
import { OffersService } from 'src/app/_services/offers.service';

@Component({
  selector: 'app-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.css']
})
export class OfferAddComponent implements OnInit {

  offer: any = {};

  constructor(private offerService: OffersService, private toastr: ToastrService) { }


  ngOnInit(): void {
    
  }

  addOffer() {
    this.offerService.addOffer(this.offer).subscribe(() => {
      this.toastr.success('Offer added successfully');
    })

  }
}