import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPhotoEditorComponent } from './offer-photo-editor.component';

describe('OfferPhotoEditorComponent', () => {
  let component: OfferPhotoEditorComponent;
  let fixture: ComponentFixture<OfferPhotoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferPhotoEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPhotoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
