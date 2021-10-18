import { Question } from "src/app/shared/models/subjects-complete";

export interface QuestionsPageState {
  currentQuestionId: string | null;
  currentQuestion: Question | null;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: QuestionSortColumn;
  sortDirection: QuestionSortDirection;
  error: any;
  deleteThis: Question,
}

export interface QuestionSort {
    column: QuestionSortColumn;
    direction: QuestionSortDirection;
}

export type QuestionSortColumn = keyof Question | '';
export type QuestionSortDirection = 'asc' | 'desc' | '';
export const QuestionSortIndicator: {[key: string]: QuestionSortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

