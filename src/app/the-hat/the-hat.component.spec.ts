import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheHatComponent } from './the-hat.component';

describe('TheHatComponent', () => {
  let component: TheHatComponent;
  let fixture: ComponentFixture<TheHatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheHatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheHatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
