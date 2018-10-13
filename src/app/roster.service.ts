import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { map,catchError } from 'rxjs/operators';
import { of, Observable } from "rxjs";
import { Roster, Student } from './roster';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  first: Roster = { 
    id: 1,
    submitDate: new Date("2018-10-12"), 
    hasTheHatDecided: true,
    students: [{  
      id: 1,  
      firstName: "Harry",
      lastName: "Potter",
      nameSuffix: "",
      gender: "male",
      hairColor: "black",
      house: "Gryffindor",
      netWorth: 1000000
    },{
      id: 2,
      firstName: "Draco",
      lastName: "Malfoy",
      nameSuffix: "",
      gender: "male",
      hairColor: "silver",
      house: "Slytherin",
      netWorth: 1000000000
    }
  ] 
  } as Roster;
 
  constructor(private http: HttpClient) {
    localStorage.setItem('rosters', JSON.stringify([this.first]));
  }

  replaceRostersInLocalStorage(rosters: Roster[]) {
    localStorage.setItem("rosters", JSON.stringify(rosters));

  }
  replaceRosterInLocalStorage(roster: Roster) {
    const rostersTemp = JSON.parse(localStorage.getItem('rosters')) as Roster[];
    const index = rostersTemp.findIndex((rosterTemp) => rosterTemp.id == roster.id);
    if (~index) {
      rostersTemp[index] = roster;
    }
    else {
      rostersTemp.push(roster);
    }

    localStorage.setItem("rosters", JSON.stringify(rostersTemp));

  }

  addRosterToLocalStorage(newRoster: Roster) {
    const rostersTemp = JSON.parse(localStorage.getItem('rosters')) as Roster[];
    rostersTemp.push(newRoster);
    localStorage.setItem("rosters", JSON.stringify(rostersTemp));

  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getRoster(id) {
    const rosters: Roster[] = JSON.parse(localStorage.getItem('rosters')) as Roster[];
    return of(rosters.find(roster => roster.id === id));
  }

  refreshRoster(id) {
    return this.http
      .get(API_URL+'/rosters/'+id)
      .pipe(map(this.extractData));
  }

  getRosterFile(id) {
    return this.http
      .get(API_URL+'/roster/'+id)
      .pipe(map(this.extractData));
  }

  getRosters() {
    return of(JSON.parse(localStorage.getItem('rosters')) as Roster[]);
  }

  uploadRoster(file) {
    const fd = new FormData();
    fd.append("file", file);
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "false" })
    }
    return this.http
      .post(API_URL +'/roster',fd)
  }
}
