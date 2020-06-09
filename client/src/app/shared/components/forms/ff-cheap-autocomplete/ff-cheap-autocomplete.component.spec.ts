import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfCheapAutocompleteComponent } from './ff-cheap-autocomplete.component';

describe('FfCheapAutocompleteComponent', () => {
  let component: FfCheapAutocompleteComponent;
  let fixture: ComponentFixture<FfCheapAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfCheapAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfCheapAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
