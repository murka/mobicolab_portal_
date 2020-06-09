import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingItemComponent } from './adding-item.component';

describe('AddingItemComponent', () => {
  let component: AddingItemComponent;
  let fixture: ComponentFixture<AddingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
