import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatingListComponent } from './dating-list.component';

describe('DatingListComponent', () => {
  let component: DatingListComponent;
  let fixture: ComponentFixture<DatingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
