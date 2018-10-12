import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterSummaryComponent } from './roster-summary.component';

describe('RosterSummaryComponent', () => {
  let component: RosterSummaryComponent;
  let fixture: ComponentFixture<RosterSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
