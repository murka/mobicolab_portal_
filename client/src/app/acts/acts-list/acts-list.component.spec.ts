import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActsListComponent } from './acts-list.component';

describe('ActsListComponent', () => {
  let component: ActsListComponent;
  let fixture: ComponentFixture<ActsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
