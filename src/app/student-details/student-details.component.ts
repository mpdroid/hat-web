import {Component, Inject,  } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatDialog,  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Student } from '../roster';
import { StudentBioComponent } from './student-bio.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {

  student: Student;
  studentProps: any[];
  studentName: String
  constructor(
    public dialogRef: MatDialogRef<StudentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private datePipe: DatePipe
    ) {
      this.student = data;
      this.studentProps = [];

      this.studentName = `${this.student.firstName} ${this.student.lastName} ${this.student.nameSuffix}`;
      this.studentName = this.studentName.trim();
      this.studentProps = [
        { "key": "First Name", "value" : this.student.firstName },
        { "key": "Last Name", "value" : this.student.lastName },
        // { "key": "Suffix", "value" : this.student.nameSuffix },
        { "key": "Gender", "value" : this.student.gender },
        { "key": "Date of Birth", "value" : this.datePipe.transform(this.student.dob,'mediumDate') },
        { "key": "Net Worth", "value" : this.student.netWorth + " gringotts" },
        { "key": "Hair Color", "value" : this.student.hairColor},
        { "key": "Elves Owned", "value" : this.student.elvesOwned},
        { "key": "Dementors Battled", "value" : this.student.dementorsBattled}
      ];
    }

  onCloseClick(): void {
    this.dialogRef.close();
  }


}
