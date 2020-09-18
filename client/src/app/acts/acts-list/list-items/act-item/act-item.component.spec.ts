import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActItemComponent } from './act-item.component';

describe('ActItemComponent', () => {
  let component: ActItemComponent;
  let fixture: ComponentFixture<ActItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
