import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Offer } from 'src/app/_models/offer';
import { OffersService } from 'src/app/_services/offers.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private offerService: OffersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadOffer();

    this.galleryOptions = [
      {
        width: '600px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]

  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.offer.offerPhotos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  loadOffer() {
    this.offerService.getOfferDetails(this.route.snapshot.paramMap.get('id')).subscribe(offer => {
      this.offer = offer;
      this.galleryImages = this.getImages();
    })
  }

}
