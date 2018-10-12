import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterSubmitComponent } from './roster-submit.component';

describe('RosterSubmitComponent', () => {
  let component: RosterSubmitComponent;
  let fixture: ComponentFixture<RosterSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
