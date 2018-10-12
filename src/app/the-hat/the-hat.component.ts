import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HatRulesComponent } from '../hat-rules/hat-rules.component';

@Component({
  selector: 'app-the-hat',
  templateUrl: './the-hat.component.html',
  styleUrls: ['./the-hat.component.css']
})
export class TheHatComponent implements OnInit {

  dialogRef: MatDialogRef<HatRulesComponent>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  showRules() {
    if (this.dialogRef) {
      return;
    }
    this.dialogRef = this.dialog.open(HatRulesComponent, {
      height: '80%',
      width: '800px',
      hasBackdrop: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

}
