import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoEditorMemberComponent } from './photo-editor-member.component';

describe('PhotoEditorMemberComponent', () => {
  let component: PhotoEditorMemberComponent;
  let fixture: ComponentFixture<PhotoEditorMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoEditorMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoEditorMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
