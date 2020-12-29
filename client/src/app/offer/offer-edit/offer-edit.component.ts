import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/_models/offer';
import { User } from 'src/app/_models/user';
import { OffersService } from 'src/app/_services/offers.service';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit {
  @ViewChild('editOfferForm') editOfferForm: NgForm;

  offer: Offer;
     
 @HostListener('window:beforeunload', ['$event']) unloadNotification($event : any){
   if (this.editOfferForm.dirty) {
     $event.returnValue = true;  
   }
 }

  constructor(private offerService: OffersService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadOffer();
  }

  loadOffer() {
    this.offerService.getOfferDetails(this.route.snapshot.paramMap.get('id')).subscribe(offer => {
      this.offer = offer;
    })
  }

  updateOffer(){
    this.offerService.updateOffer(this.offer).subscribe(() => {
      this.toastr.success('Updated successfully');
      this.editOfferForm.reset(this.offer);
    })
    
  }

}
