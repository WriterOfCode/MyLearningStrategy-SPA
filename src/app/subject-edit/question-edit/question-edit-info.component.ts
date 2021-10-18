import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubjectEditService } from '../subject-edit.service';

@Component({
  selector: 'mls-question-edit-info',
  templateUrl: './question-edit-info.component.html',
  styleUrls: ['./question-edit-info.component.css']
})
export class QuestionEditInfoComponent implements OnChanges {

  @ViewChild(NgForm) questionInfoForm: NgForm;

  constructor(public subEditSrv: SubjectEditService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.subEditSrv.mergeCurrentQuestion();
  }
}
