import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatingYearsComponent } from './dating-years.component';

describe('DatingYearsComponent', () => {
  let component: DatingYearsComponent;
  let fixture: ComponentFixture<DatingYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatingYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatingYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
