import { TestBed } from '@angular/core/testing';

import { PreventUnsavedChangesMemberEditGuard } from './prevent-unsaved-changes-member-edit.guard';

describe('PreventUnsavedChangesMemberEditGuard', () => {
  let guard: PreventUnsavedChangesMemberEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventUnsavedChangesMemberEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
