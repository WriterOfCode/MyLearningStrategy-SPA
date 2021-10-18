import { Component,  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { OverlayContainer } from '@angular/cdk/overlay';

import { SubjectEditService } from './subject-edit.service';
import { CompleteSubject } from '../shared/models/subjects-complete';
import { SubjectStoreState } from './state/subject-edit.selectors';

import { getCurrentSubject } from './state/subject-edit.selectors';
import { selectAllCategories,categoriesEntityState } from '../categories/state/categories.entity.selectors';
import { Category } from '../shared/models/category';

export function compareCategories(c1: Category, c2: Category): boolean  {
  return c1.id  === c2.id ? true : false
}

@Component({
  selector: 'mls-subject-edit-info',
  templateUrl: './subject-edit-info.component.html',
  styleUrls: ['./subject-edit-info.component.css']
})
export class SubjectEditInfoComponent{
  @ViewChild(NgForm) subjectInfoForm: NgForm;
  categories$: Observable<Category[]>;
  subject$: Observable<CompleteSubject>;

  constructor(private subjectStore: Store<SubjectStoreState>,
              private categoriesStore:Store<categoriesEntityState>,
              public subjectEditService: SubjectEditService,
              overlayContainer: OverlayContainer) {
      this.categories$ = this.categoriesStore.select(selectAllCategories);
      this.subject$ = this.subjectStore.select(getCurrentSubject);
      overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    }
  onChange(newValue) {
      console.log(this.subjectEditService.currentSubject)
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  compareCategories(c1: Category, c2: Category): boolean {
    if (c1 === null && c2 === null) return true;
    if (c1 === null || c2 === null) return false;
    return c1.id === c2.id ? true : false
  }

  add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
      if (!this.subjectEditService.currentSubject.tags){
        this.subjectEditService.currentSubject.tags = [];
      }
      if ((value || '').trim()) {
        this.subjectEditService.currentSubject.tags.push(value.trim());
      }
      if (input) { input.value = ''; }
      console.log( this.subjectEditService.currentSubject.tags);
    }

  remove(tag: string): void {
      const index = this.subjectEditService.currentSubject.tags.indexOf(tag);

      if (index >= 0) {
        this.subjectEditService.currentSubject.tags.splice(index, 1);
      }
    }

}
