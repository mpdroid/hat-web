import { Component , ViewChild } from '@angular/core';
import { TheHatComponent } from './the-hat/the-hat.component';
import { RosterSummaryComponent } from './roster-summary/roster-summary.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hat-web';
  @ViewChild(RosterSummaryComponent)  rosterSummaryComponent: RosterSummaryComponent;



  refresh() {
    this.rosterSummaryComponent.refreshRosters();
  }
}
