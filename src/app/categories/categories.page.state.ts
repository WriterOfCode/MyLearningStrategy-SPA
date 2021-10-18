import { Category } from "../shared/models/category";
export interface CategoryPageState {
  currentCategoryId: number | null;
  currentCategory: Category | null;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: CategorySortColumn;
  sortDirection: CategorySortDirection;
  error: any,
}
export interface CategorySort {
  column: CategorySortColumn;
  direction: CategorySortDirection;
}

export type CategorySortColumn = keyof Category | '';
export type CategorySortDirection = 'asc' | 'desc' | '';

