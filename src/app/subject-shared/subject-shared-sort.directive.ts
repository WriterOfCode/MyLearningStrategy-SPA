import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {CompleteSubject} from '../shared/models/subjects-complete';
export type SubjectSharedSortColumn = keyof CompleteSubject | '';
export type SubjectSharedSortDirection = 'asc' | 'desc' | '';
// tslint:disable-next-line: object-literal-key-quotes
const rotate: {[key: string]: SubjectSharedSortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SubjectSharedSortEvent {
  column: SubjectSharedSortColumn;
  direction: SubjectSharedSortDirection;
}

@Directive({
  selector: '[mlsSubjectSharedSort]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SubjectSharedSortDirective {

  constructor() { }
  @Input() mLSharedSubjectList: SubjectSharedSortColumn = '';
  @Input() direction: SubjectSharedSortDirection = '';
  @Output() sort = new EventEmitter<SubjectSharedSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.mLSharedSubjectList, direction: this.direction});
  }

}
