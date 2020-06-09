import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDeleteConfirmComponent } from './file-delete-confirm.component';

describe('FileDeleteConfirmComponent', () => {
  let component: FileDeleteConfirmComponent;
  let fixture: ComponentFixture<FileDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
