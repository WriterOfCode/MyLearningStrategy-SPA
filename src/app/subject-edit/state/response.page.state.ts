import { Response } from '../../shared/models/subjects-complete'

export interface ResponsePageState {
  currentResponseId: string | null;
  currentResponse: Response | null;
  error?: any;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: ResponseSortColumn;
  sortDirection: ResponseSortDirection;
  deleteThis: Response | null
}
export interface ResponseSort {
  column: ResponseSortColumn;
  direction: ResponseSortDirection;
}

export type ResponseSortColumn = keyof Response | '';
export type ResponseSortDirection = 'asc' | 'desc' | '';
export const ResponseSortIndicator: {[key: string]: ResponseSortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
