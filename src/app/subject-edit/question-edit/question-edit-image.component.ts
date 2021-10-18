import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubjectEditService } from '../subject-edit.service';

@Component({
  selector: 'mls-question-edit-image',
  templateUrl: './question-edit-image.component.html',
  styleUrls: ['./question-edit-image.component.css']
})
export class QuestionEditImageComponent {
  constructor( public subEditSrv: SubjectEditService) { }
  @ViewChild(NgForm) questionImageForm: NgForm;
}
