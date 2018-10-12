import {Component, Inject} from '@angular/core';
import {MatDialog,  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-hat-rules',
  templateUrl: './hat-rules.component.html',
  styleUrls: ['./hat-rules.component.css']
})
export class HatRulesComponent {

  constructor( public dialogRef: MatDialogRef<HatRulesComponent>) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
