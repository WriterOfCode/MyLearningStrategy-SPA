import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { QuestionSort,
  QuestionSortColumn, 
  QuestionSortDirection,
  QuestionSortIndicator } from '../state/questions.page.state';

export type SortDirection = 'asc' | 'desc' | '';
// tslint:disable-next-line: object-literal-key-quotes
const rotate: {[key: string]: QuestionSortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

@Directive({
  selector: 'th[mLSQuestionsListSort]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class QuestionsListSortDirective {
  @Input() mLSQuestionsListSort: QuestionSortColumn = '';
  @Input() direction: QuestionSortDirection = '';
  @Output() sort = new EventEmitter<QuestionSort>();

  rotate() {
    this.direction = QuestionSortIndicator[this.direction];
    this.sort.emit({column: this.mLSQuestionsListSort, direction: this.direction});
  }
}