import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfAutocompleteComponent } from './ff-autocomplete.component';

describe('FfAutocompleteComponent', () => {
  let component: FfAutocompleteComponent;
  let fixture: ComponentFixture<FfAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
