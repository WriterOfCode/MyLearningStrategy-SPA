import { BehaviorSubject, Observable, of, Subject as rxSubject, throwError as _throw } from 'rxjs';
import { Component,
  ViewChildren,
  QueryList,
  ChangeDetectionStrategy,
  OnInit,
  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';

import { Question } from '../../shared/models/subjects-complete'
import {
  QuestionSort,
  QuestionSortColumn,
  QuestionSortDirection,
  QuestionsPageState  } from '../state/questions.page.state';
import { QuestionsPageActions } from '../state/actions/index';
import { QuestionsListSortDirective } from './questions-list-sort.directive';
import { getQuestionsListCurrentPage,
  getQuestionsListError,
  getQuestionsListPageSize,
  getQuestionsListSearchTerm,
  getQuestionsListSortColumn,
  getQuestionsListSortDirection } from '../state/questions.page.selectors';

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sortQuestions( questions: Question[], column: QuestionSortColumn, direction: QuestionSortDirection): Question[] {
  if (direction === '' || column === '') {
    return questions;
  } else {
    return [...questions].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matchesQuestions(question: Question, term: string) {
  if (term === null || term.length === 0 ) { return true; }
  if (question.question !== null && question.question !== undefined && question.question.length > 0 ) {
    if (question.question.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  if (question.mnemonic !== null && question.mnemonic !== undefined && question.mnemonic.length > 0 ) {
    if (question.mnemonic.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  return false;
}

@Component({
  selector: 'mls-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsListComponent {
  @ViewChildren(QuestionsListSortDirective) headers: QueryList<QuestionsListSortDirective>;
  public collectionSizeQuestion: number;
  private isLoading$ = new BehaviorSubject<boolean>(true);
  private searchQuestions$ = new rxSubject<void>();
  private questionsList$ = new BehaviorSubject<Question[]>([]);
  private questionsRecordCount$ = new BehaviorSubject<number>(0);
  private questionsResolvedData$ = new BehaviorSubject<Question[]>(null);

  private sortState: QuestionsPageState = {
    currentQuestionId: null,
    currentQuestion: null,
    currentPage: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    error: '',
    deleteThis: null,
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private questionsPageStore: Store<QuestionsPageState> ) {
      this.questionsPageStore.select(getQuestionsListCurrentPage).subscribe(currentPage => this._setQuestion({currentPage}));
      this.questionsPageStore.select(getQuestionsListPageSize).subscribe(pageSize=>this._setQuestion({pageSize}));
      this.questionsPageStore.select(getQuestionsListSearchTerm).subscribe(searchTerm=>this._setQuestion({searchTerm}));
      this.questionsPageStore.select(getQuestionsListSortColumn).subscribe(sortColumn=>this._setQuestion({sortColumn}));
      this.questionsPageStore.select(getQuestionsListSortDirection).subscribe(sortDirection=>this._setQuestion({sortDirection}));
      this.questionsPageStore.select(getQuestionsListError).subscribe(error=>this._setQuestion({error}));

      this.searchQuestions$.pipe(
        tap(() => this.isLoading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this.isLoading$.next(false))
      ).subscribe(result => {
        this.questionsList$.next(result);
      });
      this.searchQuestions$.next();
  }

  ngOnInit() {
    const resolvedData: Question[] = this.route.snapshot.data.resolvedData;
    this.quesitonList = resolvedData;
  }

  set quesitonList(result: Question[]) {
    this.questionsResolvedData$.next(result);
    this.questionsList$.next(result);
    this.questionsRecordCount$.next(result.length);
    this.searchQuestions$.next();
  }

  get questionsResolved$() { return this.questionsResolvedData$.asObservable(); }
  get questions$() { return this.questionsList$.asObservable(); }
  get questionsCount$() { return this.questionsRecordCount$.asObservable(); }

  get currentPage() { return this.sortState.currentPage; }
  set currentPage(currentPage: number) { this._setQuestion({currentPage}); }
  get pageSize() { return this.sortState.pageSize; }
  set pageSize(pageSize: number) { this._setQuestion({pageSize}); }
  get searchTerm() { return this.sortState.searchTerm; }
  set searchTerm(searchTerm: string) { this._setQuestion({searchTerm}); }
  get sortColumn() { return this.sortState.sortColumn; }
  set sortColumn(sortColumn: QuestionSortColumn) { this._setQuestion({sortColumn}); }
  get sortDirection() { return this.sortState.sortDirection; }
  set sortDirection(sortDirection: QuestionSortDirection) { this._setQuestion({sortDirection}); }

  private _setQuestion(patch: Partial<QuestionsPageState>) {
    Object.assign(this.sortState, patch);
    this.searchQuestions$.next();
  }

  private _search(): Observable<Question[]> {
    const {sortColumn, sortDirection, pageSize, currentPage, searchTerm} = this.sortState;

    if (this.questionsResolvedData$.value == null || this.questionsResolvedData$.value.length === 0) {
      return this.questionsResolvedData$;
    }
    // 1. filter
    const filteredList = this.questionsResolvedData$.value.filter(sub => matchesQuestions(sub, searchTerm));
    // 2. sort
    let sortedList = sortQuestions(filteredList, sortColumn, sortDirection);
    this.collectionSizeQuestion = sortedList.length;
    // 3. paginate
    sortedList = sortedList.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
    // 4. state to new observable
    this.questionsList$.next(sortedList);
    return of(sortedList);
  }

  onSort({column, direction}: QuestionSort) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.mLSQuestionsListSort !== column) {
        header.direction = '';
      }
    });
    this.questionsPageStore.dispatch(QuestionsPageActions.questionSortEvent({sortBy: { column, direction } }));
  }
  onSearchTermChanged(search: string) {
    this.questionsPageStore.dispatch(QuestionsPageActions.questionFilterEvent({searchTerm: search}));
  }
  onPageChange(currentPage: number)
  {
    this.questionsPageStore.dispatch(QuestionsPageActions.questionCurrentPageEvent({currentPage}));
  }
  onPageSizeChange(pagesize: number)
  {
    this.questionsPageStore.dispatch(QuestionsPageActions.questionPageSizeEvent({ pageSize: pagesize}));
  }
  onSelected(question: Question): void {
    this.questionsPageStore.dispatch(QuestionsPageActions.setCurrentQuestion({Question: question}));
  }
  onDelete(question: Question): void {
    if (confirm(`Do you realy want to detete the Question:  ${question.question}?`)) {
      this.questionsPageStore.dispatch(QuestionsPageActions.questionDeleteEvent({Question: question}));
      const deletedQ = JSON.parse(JSON.stringify(this.questionsResolvedData$.value
        .filter(sub => (sub.cloudRowId != question.cloudRowId))));
        this.quesitonList = deletedQ;
    }
  }
  onEdit(question: Question): void {
    this.questionsPageStore.dispatch(QuestionsPageActions.setCurrentQuestion({Question: question}));
    this.router.navigate(['/subject/question']);
  }
  onAdd(): void {
    const newQuestion: Question = {
      orderBy: 0,
      question:	'',
      image_1_Device:	'',
      image_1_Cloud:	'',
      image_2_Device:	'',
      image_2_Cloud:	'',
      image_3_Device:	'',
      image_3_Cloud:	'',
      hyperlink_1:	'',
      hyperlink_2:	'',
      hyperlink_3:	'',
      mnemonic:		'',
      responses: [],
      lastModifiedOffset:	new Date(),
      cloudRowId: Guid.create().toString(),
    }
    this.questionsPageStore.dispatch(QuestionsPageActions.setCurrentQuestion({Question: newQuestion}));
    this.router.navigate(['/subject/question']);
  }
}
