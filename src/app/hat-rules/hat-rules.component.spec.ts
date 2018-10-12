import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatRulesComponent } from './hat-rules.component';

describe('HatRulesComponent', () => {
  let component: HatRulesComponent;
  let fixture: ComponentFixture<HatRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HatRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
