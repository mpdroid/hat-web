import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { RosterService } from '../roster.service';
import { Roster } from '../roster';

@Component({
  selector: 'app-roster-submit',
  templateUrl: './roster-submit.component.html',
  styleUrls: ['./roster-submit.component.css']
})
export class RosterSubmitComponent implements OnInit {

  @Output() fileUploadEvent: EventEmitter<any> = new EventEmitter(); 
  @ViewChild('uploadInput') uploadInput : ElementRef;
  uploaded: File;

  constructor(
    public snackBar: MatSnackBar,
    private rosterService: RosterService
    ) { }

  ngOnInit() {
    const self = this;
    this.uploadInput.nativeElement.onchange = (event) => {
      event.preventDefault();
      let files = this.uploadInput.nativeElement.files;
      let blob = files[0].slice(0,4); 
      let fileReader = new FileReader();
      fileReader.onloadend = function(e) {
        var arr = (new Uint8Array(e.target['result'])).subarray(0, 4);
        var header = "";
        for(var i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        let type ="unknown";
        // Check the file signature against known types
        switch (header) {
          case "89504e47":
              type = "image/png";
              break;
          case "47494638":
              type = "image/gif";
              break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
              type = "image/jpeg";
              break;
          default:
              type = files[0].type; // Or you can use the blob.type as fallback
              break;
        }
        if (type !== "text/plain") {
          self.snackBar.open(files[0].name + ' is not a valid text file.', null , {
            duration: 2000
          });
          self.uploadInput.nativeElement.value=null;
          self.uploaded = null;
        }
        else {
          self.uploaded = files[0];
        }

      };
      fileReader.readAsArrayBuffer(blob);
    };

  }

  downloadFile(response: any) {
    var blob = new Blob([response.response]);
    const downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
    downloadLink.setAttribute('download', 'sample.txt');
    downloadLink.click();
    document.body.removeChild(downloadLink);  
  }


  triggerFileInput() {
    this.uploadInput.nativeElement.click();
  }

  triggerFileSubmit() {
    this.rosterService.uploadRoster(this.uploaded).subscribe(res => {
      console.log(res);
      const newRoster = res["response"] as Roster;
      this.rosterService.addRosterToLocalStorage(newRoster);

      this.snackBar.open('The Hat has accepted ' + this.uploaded.name + '.', null , {
        duration: 5000
      });
      this.uploadInput.nativeElement.value = null;
      this.uploaded = null;
      this.fileUploadEvent.emit();
    }, error => {
      console.log(error);
      let msg = '';
      if(error.error.message) {
        msg = 'The Hat has rejected ' + this.uploaded.name + '. ' + error.error.message;
      } else {
        msg = 'The Hat is away. Try again later.';
      }
      this.snackBar.open(msg, null , {
        duration: 5000
      });
      this.uploadInput.nativeElement.value = null;
      this.uploaded = null;
    });
  }
}
