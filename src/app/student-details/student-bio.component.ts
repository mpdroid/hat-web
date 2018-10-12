import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';
@Component({
  selector: 'app-student-bio',
  templateUrl: './student-bio.component.html',
  styleUrls: ['./student-bio.component.css']
})
export class StudentBioComponent implements OnInit {

  @Input() student: any[];
  displayedColumns: string[] = ['key', 'value'];
  lodash = _;
  constructor() { 
  }

  ngOnInit() {
  }

}
