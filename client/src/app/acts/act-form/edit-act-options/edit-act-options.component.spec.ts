import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActOptionsComponent } from './edit-act-options.component';

describe('EditActOptionsComponent', () => {
  let component: EditActOptionsComponent;
  let fixture: ComponentFixture<EditActOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
