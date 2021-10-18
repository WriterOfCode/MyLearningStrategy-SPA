import { throwError as _throw } from 'rxjs';
import { Component, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { SubjectSharedSortDirective, SubjectSharedSortColumn, SubjectSharedSortEvent } from './subject-shared-sort.directive';
import { CompleteSubject } from '../shared/models/subjects-complete';

const compareSubject = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sortSubject(subjects: CompleteSubject[], column: SubjectSharedSortColumn, direction: string): CompleteSubject[] {
  if (direction === '' || column === '' ) {
    return subjects;
  } else {
    return [...subjects].sort((a, b) => {
      const res = compareSubject(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}
@Component({
  selector: 'mls-subject-shared',
  templateUrl: './subject-shared.component.html',
  styleUrls: ['./subject-shared.component.css']
})
export class SubjectSharedComponent  {
  @ViewChildren(SubjectSharedSortDirective) headers: QueryList<SubjectSharedSortDirective>;

  @Output() search = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() subjectSelected = new EventEmitter<CompleteSubject>();
  @Output() sortSubjects = new EventEmitter<SubjectSharedSortEvent>();

  @Input() searchTerm: string;
  @Input() errorMessage: string;
  @Input() subjects: CompleteSubject[];
  @Input() selectedSubject: CompleteSubject;
  @Input() pageSize: number;
  @Input() collectionSize: number;
  @Input() currentPage: number;
  @Input() sort: SubjectSharedSortEvent;

  constructor( ) { }

  onSort({column, direction}: SubjectSharedSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.mLSharedSubjectList !== column) {
        header.direction = '';
      }
    });
    this.sortSubjects.emit({ column, direction } )
    this.subjects = sortSubject(this.subjects, column, direction);
  }

  onPageSizeChange(pagesize: number)
  {
    this.pageSizeChange.emit(pagesize);
  }

  onPageChange(page: number)
  {
    this.currentPageChange.emit(page);
  }

  onSelected(selected: CompleteSubject): void {
    this.subjectSelected.emit(selected);
  }

  onSearchTermChanged(search: string) {
    this.search.emit(search);
  }

}
