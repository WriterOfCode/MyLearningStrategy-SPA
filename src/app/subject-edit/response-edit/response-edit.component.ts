import { Component, OnInit } from '@angular/core';
import { SubjectEditService } from '../subject-edit.service';

@Component({
  selector: 'mls-response-edit',
  templateUrl: './response-edit.component.html',
  styleUrls: ['./response-edit.component.css']
})
export class ResponseEditComponent implements OnInit {
  pageTitle = 'Edit';

  constructor(public subEditSrv: SubjectEditService) {}

  ngOnInit() {
    if (!this.subEditSrv.currentResponse) {
      this.pageTitle = 'Response not found';
    } else {
      this.pageTitle = `Edit Response:  ${this.subEditSrv.currentResponse.response}`;
    }
  }

  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return this.subEditSrv.isDirty;
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  validate(): void {
    this.dataIsValid = {};

    // 'info' tab
    // if (this.subEditSrv.currentResponse.response &&
    //   this.subEditSrv.currentResponse.response.length >= 3 &&
    //   this.subEditSrv.currentResponse.response.length <= 50) {
    //   this.dataIsValid.info = true;
    // } else {
    //   this.dataIsValid.info = false;
    // }

    // 'tags' tab
    this.dataIsValid.tags = true;
  }

}
