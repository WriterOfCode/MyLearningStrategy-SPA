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

import { Response } from '../../shared/models/subjects-complete';
import {
  ResponseSort,
  ResponseSortColumn,
  ResponseSortDirection,
  ResponsePageState } from '../state/response.page.state';
import { ResponsePageActions } from '../state/actions/index';
import { ResponsListSortDirective } from './respons-list-sort.directive';
import { getResponseListCurrentPage,
  getResponseListError,
  getResponseListPageSize,
  getResponseListSearchTerm,
  getResponseListSortColumn,
  getResponseListSortDirection } from '../state/response.page.selectors';

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sortResponse( responses: Response[], column: ResponseSortColumn, direction: ResponseSortDirection): Response[] {
  if (direction === '' || column === '') {
    return responses;
  } else {
    return [...responses].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matchesResponse(response: Response, term: string) {
  if (term === null || term.length === 0 ) { return true; }
  if (response.response !== null && response.response !== undefined && response.response.length > 0 ) {
    if (response.response.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  if (response.mnemonic !== null && response.mnemonic !== undefined && response.mnemonic.length > 0 ) {
    if (response.mnemonic.toLowerCase().includes(term.toLowerCase())) { return true; }
  }
  return false;
}

@Component({
  selector: 'mls-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponseListComponent implements OnInit {
  @ViewChildren(ResponsListSortDirective) headers: QueryList<ResponsListSortDirective>;
  public collectionSize: number;
  private isLoading$ = new BehaviorSubject<boolean>(true);
  private searchResponses$ = new rxSubject<void>();
  private responseList$ = new BehaviorSubject<Response[]>([]);
  private responseRecordCount$ = new BehaviorSubject<number>(0);
  private responseResolvedData$ = new BehaviorSubject<Response[]>(null);

  private sortState: ResponsePageState = {
    currentResponseId: null,
    currentResponse: null,
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
    private responsePageStore: Store<ResponsePageState> ) {
      this.responsePageStore.select(getResponseListCurrentPage).subscribe(currentPage => this._setResponse({currentPage}));
      this.responsePageStore.select(getResponseListPageSize).subscribe(pageSize=>this._setResponse({pageSize}));
      this.responsePageStore.select(getResponseListSearchTerm).subscribe(searchTerm=>this._setResponse({searchTerm}));
      this.responsePageStore.select(getResponseListSortColumn).subscribe(sortColumn=>this._setResponse({sortColumn}));
      this.responsePageStore.select(getResponseListSortDirection).subscribe(sortDirection=>this._setResponse({sortDirection}));
      this.responsePageStore.select(getResponseListError).subscribe(error=>this._setResponse({error}));

      this.searchResponses$.pipe(
        tap(() => this.isLoading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this.isLoading$.next(false))
      ).subscribe(result => {
        this.responseList$.next(result);
      });
      this.searchResponses$.next();
  }

  ngOnInit() {
    const resolvedData: Response[] = this.route.snapshot.data.resolvedData;
    this.responseList = resolvedData;
  }

  set responseList(result: Response[]) {
    this.responseResolvedData$.next(result);
    this.responseList$.next(result);
    this.responseRecordCount$.next(result.length);
    this.searchResponses$.next();
  }

  get responseResolved$() { return this.responseResolvedData$.asObservable(); }
  get responses$() { return this.responseList$.asObservable(); }
  get responseCount$() { return this.responseRecordCount$.asObservable(); }

  get currentPage() { return this.sortState.currentPage; }
  set currentPage(currentPage: number) { this._setResponse({currentPage}); }
  get pageSize() { return this.sortState.pageSize; }
  set pageSize(pageSize: number) { this._setResponse({pageSize}); }
  get searchTerm() { return this.sortState.searchTerm; }
  set searchTerm(searchTerm: string) { this._setResponse({searchTerm}); }
  get sortColumn() { return this.sortState.sortColumn; }
  set sortColumn(sortColumn: ResponseSortColumn) { this._setResponse({sortColumn}); }
  get sortDirection() { return this.sortState.sortDirection; }
  set sortDirection(sortDirection: ResponseSortDirection) { this._setResponse({sortDirection}); }

  private _setResponse(patch: Partial<ResponsePageState>) {
    Object.assign(this.sortState, patch);
    this.searchResponses$.next();
  }

  private _search(): Observable<Response[]> {
    const {sortColumn, sortDirection, pageSize, currentPage, searchTerm} = this.sortState;

    if (this.responseResolvedData$.value == null || this.responseResolvedData$.value.length === 0) {
      return this.responseResolvedData$;
    }
    // 1. filter
    const filteredList = this.responseResolvedData$.value.filter(sub => matchesResponse(sub, searchTerm));
    // 2. sort
    let sortedList = sortResponse(filteredList, sortColumn, sortDirection);
    this.collectionSize = sortedList.length;
    // 3. paginate
    sortedList = sortedList.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
    // 4. state to new observable
    this.responseList$.next(sortedList);
    return of(sortedList);
  }

  onSort({column, direction}: ResponseSort) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.mLSResponseListSort !== column) {
        header.direction = '';
      }
    });
    this.responsePageStore.dispatch(ResponsePageActions.responseSortEvent({sortBy:  { column, direction } }));
  }
  onSearchTermChanged(search: string) {
    this.responsePageStore.dispatch(ResponsePageActions.responseFilterEvent({searchTerm: search}));
  }
  onPageChange(currentPage: number)
  {
    this.responsePageStore.dispatch(ResponsePageActions.responseCurrentPageEvent({currentPage}));
  }
  onPageSizeChange(pagesize: number)
  {
    this.responsePageStore.dispatch(ResponsePageActions.responsePageSizeEvent({ pageSize: pagesize}));
  }
  onSelected(response: Response): void {
    console.log('selected response:' + response)
    this.responsePageStore.dispatch(ResponsePageActions.setCurrentResponse({currentResponse: response}));
  }
  onDelete(response: Response): void {
    if (confirm(`Do you realy want to detete the response:  ${response.response}?`)) {
      this.responsePageStore.dispatch(ResponsePageActions.responseDeleteEvent({response: response}));
      const deleted = JSON.parse(JSON.stringify(this.responseResolvedData$.value
        .filter(sub => (sub.cloudRowId != response.cloudRowId))));
        this.responseList = deleted;
    }
  }
  onEdit(response: Response): void {
    this.responsePageStore.dispatch(ResponsePageActions.setCurrentResponse({currentResponse: response}));
    this.router.navigate(['/subject/question/response']);
  }
  onAdd(): void {
    const newResponse: Response = {
      orderBy: 0,
      response:	'',
      isCorrect:	true,
      image_1_Device:	'',
      image_1_Cloud:	'',
      image_2_Device:	'',
      image_2_Cloud:	'',
      image_3_Device:	'',
      image_3_Cloud:	'',
      hyperlink_1:	'',
      hyperlink_2:	'',
      hyperlink_3:	'',
      mnemonic:	'',
      lastModifiedOffset:	new Date(),
      cloudRowId: Guid.create().toString(),
    }
    this.responsePageStore.dispatch(ResponsePageActions.setCurrentResponse({currentResponse: newResponse}));
    this.router.navigate(['/subject/question/response']);
  }

}
