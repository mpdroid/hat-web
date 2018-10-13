import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Roster, Student } from '../roster';
import { RosterService } from '../roster.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ThrowStmt } from '@angular/compiler';
import { DatePipe } from '@angular/common';

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
    private rosterService: RosterService,
    private datePipe : DatePipe
    ) { }

  ngOnInit() {
    this.loadRosters();
    this.intervalHolder = setInterval(() => {
      const rostersTemp = this.rosters.slice();
      let didUpdate = false;
      rostersTemp.forEach((roster,i) => {
        if (!roster.hasTheHatDecided) {
          this.rosterService.refreshRoster(roster.id).subscribe((res) => {
            const newRoster = res as Roster;
            this.rosterService.replaceRosterInLocalStorage(newRoster);
            this.loadRosters();
          });
        }
       });
    }, 1000 * 10);
  }
  compare(a,b) {
    if (a.submitDate > b.submitDate)
      return -1;
    if (a.submitDate < b.submitDate)
      return 1;
    return 0;
  }

  loadRosters() {
      this.rosterService.getRosters()
      .subscribe( data => {
        const rostersTemp = (data as Roster[]);
        rostersTemp.sort(this.compare);
        this.rosters = rostersTemp;
      })

  }

  ngOnDestroy() {
    clearInterval(this.intervalHolder);
  }
  
  downloadRoster(event, id) {
    event.stopPropagation();
    this.rosterService.getRoster(id).subscribe(response => this.downloadFile(response, id)),
                 error => console.log("Error downloading the file."),
                 () => console.info("OK");

  }

  downloadFile(response: any, id) {
    var blob = new Blob([this.convertRosterToCSV(response as Roster)], {type : 'text/plain'});
    console.log(blob);
    const downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
    downloadLink.setAttribute('download', 'roster_' + (new Date()).getTime() + '.txt');
    document.body.appendChild(downloadLink);
    setTimeout(() => {
      downloadLink.click();
      document.body.removeChild(downloadLink);  
    },1000);
  }

  convertRosterToCSV(roster: Roster) {
    let ret = "First Name, Last Name, Suffix, Gender, Date of Birth, Net Worth, Hair Color";
    roster.students.forEach( (student) => {
      ret = ret + "\n";
      ret = ret + student.firstName + ", ";
      ret = ret + student.lastName + ", ";
      ret = ret + student.nameSuffix + ", ";
      ret = ret + student.gender + ", ";
      ret = ret + this.datePipe.transform(student.dob, 'yyyy-MM-dd') + ", ";
      ret = ret + student.netWorth + ", ";
      ret = ret + student.hairColor + ", ";
    })
    return ret;

  }


}
