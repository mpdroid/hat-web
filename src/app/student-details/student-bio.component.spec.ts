import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBioComponent } from './student-bio.component';

describe('StudentBioComponent', () => {
  let component: StudentBioComponent;
  let fixture: ComponentFixture<StudentBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
