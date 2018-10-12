import { Component, OnInit, Input } from '@angular/core';
import { Roster, Student } from '../roster';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StudentDetailsComponent } from '../student-details/student-details.component';

@Component({
  selector: 'app-roster-details',
  templateUrl: './roster-details.component.html',
  styleUrls: ['./roster-details.component.css']
})
export class RosterDetailsComponent implements OnInit {

  @Input() roster: Roster;
  students: Student[];
  displayedColumns: string[] = ['name', 'house', 'filler'];

  dialogRef: MatDialogRef<StudentDetailsComponent>;

  constructor(public dialog: MatDialog) { }


  ngOnInit() {
    this.students = this.roster.students;
  }
  showStudentDetails(row) {
    if (this.dialogRef) {
      return;
    }
    this.dialogRef = this.dialog.open(StudentDetailsComponent, {
      height: '80%',
      width: '800px',
      hasBackdrop: false,
      data: row
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }


}
