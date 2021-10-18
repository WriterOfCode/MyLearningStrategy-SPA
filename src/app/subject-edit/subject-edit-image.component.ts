import { Component } from '@angular/core';
import { SubjectEditService } from './subject-edit.service';
@Component({
  selector: 'mls-subject-edit-image',
  templateUrl: './subject-edit-image.component.html',
  styleUrls: ['./subject-edit-image.component.css']
})
export class SubjectEditImageComponent {
  constructor( public subEditSrv: SubjectEditService) { }
}



