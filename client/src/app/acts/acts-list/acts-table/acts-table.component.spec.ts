import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActsTableComponent } from './acts-table.component';

describe('ActsTableComponent', () => {
  let component: ActsTableComponent;
  let fixture: ComponentFixture<ActsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
