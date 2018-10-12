import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { TheHatComponent } from './the-hat/the-hat.component';
import { RosterSubmitComponent } from './roster-submit/roster-submit.component';
import { RosterSummaryComponent } from './roster-summary/roster-summary.component';
import { RosterDetailsComponent } from './roster-details/roster-details.component';
import { HatRulesComponent } from './hat-rules/hat-rules.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentBioComponent } from './student-details/student-bio.component';


@NgModule({
  declarations: [
    AppComponent,
    TheHatComponent,
    RosterSubmitComponent,
    RosterSummaryComponent,
    RosterDetailsComponent,
    HatRulesComponent,
    StudentDetailsComponent,
    StudentBioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatSnackBarModule,
    MatGridListModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    HatRulesComponent,
    StudentDetailsComponent
  ],
})
export class AppModule { }
