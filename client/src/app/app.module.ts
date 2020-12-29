import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { OfferListComponent } from './offer/offer-list/offer-list.component';
import { OfferDetailComponent } from './offer/offer-detail/offer-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { OfferEditComponent } from './offer/offer-edit/offer-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { OfferUserListComponent } from './offer/offer-user-list/offer-user-list.component';
import { OfferAddComponent } from './offer/offer-add/offer-add.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PhotoEditorMemberComponent } from './members/photo-editor-member/photo-editor-member.component';
import { FileUploadModule } from 'ng2-file-upload';
import { OfferPhotoEditorComponent } from './offer/offer-photo-editor/offer-photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    OfferListComponent,
    OfferDetailComponent,
    OfferEditComponent,
    OfferUserListComponent,
    OfferAddComponent,
    MemberListComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorMemberComponent,
    OfferPhotoEditorComponent,
    TextInputComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    NgxGalleryModule,
    TabsModule,
    FileUploadModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
