import { Component, OnInit, Input, ViewChild, Inject, OnChanges } from '@angular/core';
import { ActControlService } from 'src/app/services/controls/act-control.service';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatStepper } from '@angular/material/stepper';
import { saveAs } from 'file-saver';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ActModel } from 'src/app/shared/models/act.model';

@Component({
  selector: 'app-status-stepper',
  templateUrl: './status-stepper.component.html',
  styleUrls: ['./status-stepper.component.scss']
})
export class StatusStepperComponent implements OnInit, OnChanges {
  @Input() act: ActModel;

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  id: Params;
  urlScan: string;
  urlDoc: string;
  urlProtocol: string;
  urlProtocolFinal: string;
  file: File = null;
  docname: string;
  scanname: string;
  protocolname: string;
  finalprotocolname: string;

  constructor(private acs: ActControlService,
    private route: ActivatedRoute,
    private _bottomSheet: MatBottomSheet) { }


  ngOnInit() {
    this.id = this.route.params;
    this.urlScan = environment.baseURL + 'file/scanAct/' + this.id.value.id;
    this.urlDoc = environment.baseURL + 'file/' + this.id.value.id;
    this.urlProtocol = environment.baseURL + 'file/protocol/' + this.id.value.id;
    this.urlProtocolFinal = environment.baseURL + 'file/protocolFinal/' + this.id.value.id;
  }

  ngOnChanges() {
    console.log('ngOninit', this.act);
    
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
  }

  selectFile(type: string) {
    if (type == 'scan') {
      this.uploadFile(this.file, this.urlScan);
      this.scanname = '';
    } else if (type == 'doc') {
      this.uploadFile(this.file, this.urlDoc);
      this.docname = '';
    } else if (type == 'protocol') {
      this.uploadFile(this.file, this.urlProtocol);
      this.protocolname = '';
    } else if (type == 'finalprotocol') {
      this.uploadFile(this.file, this.urlProtocolFinal);
      this.finalprotocolname = '';
    }
    this.file = null;
  }

  uploadFile(file: File, url: string) {
    if (!file) {
      console.log("no file selected");
      return
    }
    this.acs.uploadFile(url, file)
      .subscribe((act) => {
        this.act = act; console.log(act);
        
      });
  }

  downloadScan() {
    this.acs.downloadScan(this.act._id)
      .subscribe(data => {
        saveAs(data, `scanAct${this.act._id}.pdf`)
      })
  }

  downloadDoc() {
    // this.acs.downloadDoc(this.act._id)
    //   .subscribe(data =>
    //     saveAs(data, `Акт${this.act._id}.docx`)
    //   );
  }

  downloadProtocol() {
    this.acs.downloadProtocol(this.act._id)
      .subscribe(data =>
        saveAs(data, `Протокол${this.act._id}.pdf`)
      );
  }

  downloadFinalProtocol() {
    this.acs.downloadFinalProtocol(this.act._id)
      .subscribe(data =>
        saveAs(data, `Протокол(итог)${this.act._id}.pdf`)
      );
  }

  changeStatusToNoRemarks() {
    this.acs.patchAct(this.id.value.id, {"status.remarks": false, "status.noRemarks": true})
      .subscribe(act => this.act = act);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(CommentBottomSheet, {data: {'status': this.act.status.remarks}}).afterDismissed()
      .subscribe(result => {
        if (result.condition === "comment") { this.acs.postComment(this.id.value.id, {"comment": result.comment}).subscribe(act => this.act = act)}
        if (result.condition === 'remarks') { this.acs.postComment(this.id.value.id, {"comment": result.comment})
                                              .subscribe((act) => {this.acs.patchAct(this.id.value.id, {"status.remarks": true, "status.protocolCreated": false})
                                                .subscribe(act => {this.act = act; console.log('act', act); console.log('this act', this.act);
                                                
                                                })})}
      });
  }

  // createDoc() {
  //   this.uploaded = true;
  //   this.act.status.uploaded = this.uploaded;
  //   this.acs.createDoc(this.act._id)
  //     .subscribe(() => {
  //       this.stepper.next();
  //     });
  // }

}

@Component({
  selector: 'comment-bottom-sheet',
  templateUrl: 'comment-bottom-sheet.html',
})
export class CommentBottomSheet {
  // @ViewChild('comment', {static:false}) comment: string;
  comment: string;

  constructor(private _bottomSheetRef: MatBottomSheetRef<CommentBottomSheet>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  openLink(envent: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  changeRemarks() {
    this._bottomSheetRef.dismiss({'comment': this.comment, 'condition': 'remarks'});
  }

  addComment() {
    this._bottomSheetRef.dismiss({'comment': this.comment, 'condition': 'comment'})
  }
}
