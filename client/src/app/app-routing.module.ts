import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { OfferAddComponent } from './offer/offer-add/offer-add.component';
import { OfferDetailComponent } from './offer/offer-detail/offer-detail.component';
import { OfferEditComponent } from './offer/offer-edit/offer-edit.component';
import { OfferListComponent } from './offer/offer-list/offer-list.component';
import { OfferUserListComponent } from './offer/offer-user-list/offer-user-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesMemberEditGuard } from './_guards/prevent-unsaved-changes-member-edit.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    //canActivate: [AuthGuard],
    children: [
      { path: 'offers', component: OfferListComponent },
      { path: 'offers/:id', component: OfferDetailComponent },
      { path: 'offer/user', component: OfferUserListComponent, canActivate: [AuthGuard] },
      { path: 'offer/edit/:id', component: OfferEditComponent, canActivate: [AuthGuard], canDeactivate: [PreventUnsavedChangesGuard] },

    ]
  },

  { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
  {
    path: 'members',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members/:username', component: MemberDetailComponent },

    ]
  },

  
  { path: 'register', component: RegisterComponent },
  { path: 'member/edit', component: MemberEditComponent, canActivate: [AuthGuard], canDeactivate: [PreventUnsavedChangesMemberEditGuard] },
  { path: 'offer/add', component: OfferAddComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
