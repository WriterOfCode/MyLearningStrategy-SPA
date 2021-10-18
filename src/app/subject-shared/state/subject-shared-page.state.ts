import { Guid } from 'guid-typescript';
import { CompleteSubject } from '../../shared/models/subjects-complete';

export interface SharedSubjectPageState {
  currentSubjectId: Guid | null;
  currentSubject: CompleteSubject | null;
  error?: any;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SharedSubjectSortColumn;
  sortDirection: SharedSubjectSortDirection;
}

export interface SharedSubjectSort {
  column: SharedSubjectSortColumn;
  direction: SharedSubjectSortDirection;
}

export type SharedSubjectSortColumn = keyof CompleteSubject | '';
export type SharedSubjectSortDirection = 'asc' | 'desc' | '';
