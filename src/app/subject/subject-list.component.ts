import { throwError as _throw } from 'rxjs';
import { Component, ViewChildren, QueryList, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SubjectListSortDirective, SubjectSortColumn, SubjectSortEvent } from './subject-list-sort.directive';
import { CompleteSubject } from '../shared/models/subjects-complete';

const compareSubject = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sortSubject(subjects: CompleteSubject[], column: SubjectSortColumn, direction: string): CompleteSubject[] {
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
  selector: 'mls-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectListComponent {
  @ViewChildren(SubjectListSortDirective) headers: QueryList<SubjectListSortDirective>;

  @Output() search = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() subjectSelected = new EventEmitter<CompleteSubject>();
  @Output() deleteSubject = new EventEmitter<CompleteSubject>();
  @Output() editSubject = new EventEmitter<CompleteSubject>();
  @Output() addSubject = new EventEmitter<void>();
  @Output() sortSubjects = new EventEmitter<SubjectSortEvent>();

  @Input() searchTerm: string;
  @Input() errorMessage: string;
  @Input() subjects: CompleteSubject[];
  @Input() selectedSubject: CompleteSubject;
  @Input() pageSize: number;
  @Input() collectionSize: number;
  @Input() currentPage: number;
  @Input() sort: SubjectSortEvent;

  constructor( ) { }

  onSort({column, direction}: SubjectSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.mLSSubjectList !== column) {
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

  onDelete(selected: CompleteSubject): void {
    if (confirm(`Do you realy want to detete the Strategy:  ${selected.title}?`)) {
      this.deleteSubject.emit(selected);
    }
  }

  onEdit(selected: CompleteSubject): void {
    this.editSubject.emit(selected);
  }

  onAdd(): void {
    this.addSubject.emit();
  }

  onSelected(selected: CompleteSubject): void {
    this.subjectSelected.emit(selected);
  }

  onSearchTermChanged(search: string) {
    this.search.emit(search);
  }
}
