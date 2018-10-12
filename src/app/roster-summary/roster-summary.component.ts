import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Roster, Student } from '../roster';
import { RosterService } from '../roster.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-roster-summary',
  templateUrl: './roster-summary.component.html',
  styleUrls: ['./roster-summary.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RosterSummaryComponent implements OnInit, OnDestroy {

  intervalHolder: any;

  displayedColumns: string[] = ['submitDate', 'hasTheHatDecided', 'download'];
  detailColumns: string[] = ['students'];
  rosters: Roster[];

  constructor(
    public snackBar: MatSnackBar,
    private rosterService: RosterService
    ) { }

  ngOnInit() {
    this.refreshRosters();
    this.intervalHolder = setInterval(() => {
      this.refreshRosters();
    }, 1000 * 10);
  }

  refreshRosters() {
      this.rosterService.getRosters()
      .subscribe( data => {
        this.rosters = data as Roster[];
        console.log(this.rosters[0]);
        console.log(this.rosters[0].students[1]);
        
      })

  }

  ngOnDestroy() {
    clearInterval(this.intervalHolder);
  }
  
  downloadRoster(event, id) {
    event.stopPropagation();
    this.rosterService.getRosterFile(id).subscribe(response => this.downloadFile(response, id)),
                 error => console.log("Error downloading the file."),
                 () => console.info("OK");

  }

  downloadFile(response: any, id) {
    var blob = new Blob([response.response]);
    const downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
    downloadLink.setAttribute('download', 'roster_' + id + '.txt');
    downloadLink.click();
    document.body.removeChild(downloadLink);  
  }


}
