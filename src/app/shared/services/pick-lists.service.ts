import { Injectable } from '@angular/core';
import { PickList } from '../models/pick-list';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickListsService {

  constructor() { }

  getQuestionSortRules(): Observable<PickList[]> {
    return of([{ Id: 0, Definition: 'Sort questions ascending.' , Name: 'Ascending' },
    { Id: 1, Definition: 'Sort questions decending.' , Name: 'Decending' },
    { Id: 2, Definition: 'Sort questions by randomly.' , Name: 'Random' },
    { Id: 3, Definition: 'Sort questions by Category.' , Name: 'Category' } ]);
  }

  getQuestionSelection(): Observable<PickList[]> {
    return of([ { Id: 0, Definition: 'Pick all questions' , Name: 'All' },
    { Id: 1, Definition: 'Pick random questions' , Name: 'Random' },
    { Id: 2, Definition: 'Pick questions by category' , Name: 'Category' }] );
  }

  getResponseSelection(): Observable<PickList[]> {
    return of([ { Id: 0, Definition: 'Pick all responses' , Name: 'All' },
    { Id: 1, Definition: 'Pick random responses' , Name: 'Random' },
    { Id: 2, Definition: 'Pick qnly correct responses' , Name: 'Only Correct' }] );
  }
}
