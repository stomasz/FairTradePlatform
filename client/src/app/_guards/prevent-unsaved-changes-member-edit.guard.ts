import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesMemberEditGuard implements  CanDeactivate<unknown> {

  canDeactivate(component: MemberEditComponent): boolean {
    if(component.editMemberForm.dirty){
      return confirm('Are you sure? Unsaved changes will be lost');
    }
    return true;
  }

}
