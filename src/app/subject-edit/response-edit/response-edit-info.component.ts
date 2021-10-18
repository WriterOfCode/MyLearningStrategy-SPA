import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Response } from '../../shared/models/subjects-complete';
import { SubjectEditService } from '../subject-edit.service';

@Component({
  selector: 'mls-response-edit-info',
  templateUrl: './response-edit-info.component.html',
  styleUrls: ['./response-edit-info.component.css']
})
export class ResponseEditInfoComponent {
  @ViewChild(NgForm) responseInfoForm: NgForm;

  constructor(public subEditSrv: SubjectEditService) { }
}
