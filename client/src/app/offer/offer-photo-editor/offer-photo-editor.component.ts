import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { Offer } from 'src/app/_models/offer';
import { OfferPhoto } from 'src/app/_models/offerPhoto';
import { OffersService } from 'src/app/_services/offers.service';


@Component({
  selector: 'app-offer-photo-editor',
  templateUrl: './offer-photo-editor.component.html',
  styleUrls: ['./offer-photo-editor.component.css']
})
export class OfferPhotoEditorComponent implements OnInit, OnChanges {

  @Input() offer: Offer;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
 
  

  constructor(private accountService: AccountService, private offerService: OffersService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    
  }
  ngOnChanges(changes: SimpleChanges): void {       //?? del?
    this.offer = changes.offer.currentValue
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: OfferPhoto){
    this.offerService.setMainPhoto(this.offer.id ,photo.id).subscribe(() =>{
      this.offer.photoUrl = photo.url;
      this.offer.offerPhotos.forEach(p => {
        if(p.isMain) p.isMain = false;
        if(p.id === photo.id) p.isMain = true;
      })
    });
  }

  deletePhoto(photoId: number){
    this.offerService.deletePhoto(this.offer.id, photoId).subscribe(() =>{
      this.offer.offerPhotos = this.offer.offerPhotos.filter(x=> x.id !== photoId);
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'offer/add-photo/' + this.offer.id,  
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.offer.offerPhotos.push(photo);
      }
    }
  }

}
