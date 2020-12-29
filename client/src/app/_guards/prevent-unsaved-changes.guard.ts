import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { OfferEditComponent } from '../offer/offer-edit/offer-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  canDeactivate(component: OfferEditComponent): boolean {
    if (component.editOfferForm.dirty) {
      return confirm('Are you sure? Unsaved changes will be lost');
    }
    return true;
  }


}
