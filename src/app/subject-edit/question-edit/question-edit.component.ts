import { Component, OnInit } from '@angular/core';
import { SubjectEditService } from '../subject-edit.service';
import { faExclamation, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'mls-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  pageTitle = 'Edit';
  exclamationIconQ = faExclamation;
  exclamationTriangelIconQ = faExclamationTriangle;
  exclamatinoCircleQ = faExclamationCircle;
  constructor(public subEditSrv: SubjectEditService) {}

  ngOnInit() {
    if (!this.subEditSrv.currentQuestion) {
      this.pageTitle = 'Question not found';
    } else {
      this.pageTitle = `Edit Question:  ${this.subEditSrv.currentQuestion.question}`;
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

    // // 'info' tab
    // if (this.subEditSrv.currentQuestion.question &&
    //   this.subEditSrv.currentQuestion.question.length >= 1 &&
    //   this.subEditSrv.currentQuestion.question.length <= 50) {
    //   this.dataIsValid.info = true;
    // } else {
    //   this.dataIsValid.info = false;
    // }

    // 'tags' tab
    this.dataIsValid.tags = true;
    // image tab
    this.dataIsValid.image = true;
    // responses tab
    this.dataIsValid.responses = true;
  }

}
