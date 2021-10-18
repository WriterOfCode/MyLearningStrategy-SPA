import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubjectEditService } from '../subject-edit.service';

@Component({
  selector: 'mls-response-edit-image',
  templateUrl: './response-edit-image.component.html',
  styleUrls: ['./response-edit-image.component.css']
})
export class ResponseEditImageComponent {
  @ViewChild(NgForm) responseImageForm: NgForm;

  constructor( public subEditSrv: SubjectEditService) {}
}
