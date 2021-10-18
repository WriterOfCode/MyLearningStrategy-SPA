import { Strategy } from "../shared/models/strategy";
export interface StrategyPageState {
  currentStrategyId: number | null;
  currentStrategy: Strategy | null;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: StrategySortColumn;
  sortDirection: StrategySortDirection;
  error: any;
}

export interface StrategySort {
  column: StrategySortColumn;
  direction: StrategySortDirection;
}

export type StrategySortColumn = keyof Strategy | '';
export type StrategySortDirection = 'asc' | 'desc' | '';
