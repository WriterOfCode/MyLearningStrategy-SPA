import { Guid } from 'guid-typescript';
import { CompleteSubject } from '../../shared/models/subjects-complete';
export interface SubjectsPageState {
  currentSubjectId: Guid | null;
  currentSubject: CompleteSubject | null;
  error?: any;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SubjectSortColumn;
  sortDirection: SubjectSortDirection;
}
export interface SubjectSort {
  column: SubjectSortColumn;
  direction: SubjectSortDirection;
}

export type SubjectSortColumn = keyof CompleteSubject | '';
export type SubjectSortDirection = 'asc' | 'desc' | '';
