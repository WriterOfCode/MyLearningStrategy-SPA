import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Subject as rxSubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { getCurrentSubject } from './state/subject-edit.selectors';
import { getCurrentQuestion, getQuestionsListDeleteThis } from './state/questions.page.selectors';
import { getCurrentResponse, getResponseListDeleteThis } from './state/response.page.selectors';
import { CompleteSubject, Question, Response } from '../shared/models/subjects-complete'
import { SubjectPageActions } from './state/actions/index';
import { SubjectsApiActions, SubjectsEntityActions } from '../shared/state/actions/index'
import { CompleteSubjectEntityReducer } from '../shared/state/subjects.entity.reducer';
import { Guid } from 'guid-typescript';
@Injectable({
  providedIn: 'root'
})
export class SubjectEditService {
  private originalSubject: CompleteSubject;
  public currentSubject: CompleteSubject | null;
  public currentQuestion: Question | null;
  public currentResponse: Response | null;

  constructor(private store: Store) {
    this.store.select(getCurrentSubject)
    .pipe(
      catchError(error => of(SubjectsApiActions.subjectException({error: "An error occured while deleting the subject. Subject was not deleted. Error:" + error })))
    )
    .subscribe(data => this.currentSubject = JSON.parse(JSON.stringify(data)));

    this.store.select(getCurrentQuestion)
    .subscribe(data => this.currentQuestion  =  JSON.parse(JSON.stringify(data)));

    this.store.select(getCurrentResponse)
    .subscribe(data => this.currentResponse  =  JSON.parse(JSON.stringify(data)));

    this.store.select(getQuestionsListDeleteThis)
    .pipe(
      catchError(error => of(SubjectsApiActions.subjectException({error: "An error occured while deleting the subject. Subject was not deleted. Error:" + error })))
    )
    .subscribe(data => this.deleteCurrentQuestion(JSON.parse(JSON.stringify(data))));

    this.store.select(getResponseListDeleteThis)
    .pipe(
      catchError(error => of(SubjectsApiActions.subjectException({error: "An error occured while deleting the subject. Subject was not deleted. Error:" + error })))
    )
    .subscribe(data => this.deleteCurrentResponse(JSON.parse(JSON.stringify(data))));
  }

  public deleteCurrentResponse(DelResponse: Response) {
    if (DelResponse === undefined || DelResponse === null) return;
    if (this.currentSubject === undefined || this.currentSubject === null ) return;
    if (this.currentQuestion === undefined || this.currentQuestion === null) return;
    if (this.currentResponse === undefined || this.currentResponse === null) return;

    console.log('delete Current Response subject edit service')
    if (this.currentQuestion.responses === undefined || this.currentQuestion.responses === null ){
      this.currentQuestion.responses = [];
      return;
    }
    console.log('I am looking for the response to delete');
    const index = this.currentQuestion.responses
    .findIndex(r=>r.cloudRowId === DelResponse.cloudRowId);

    if (index>-1){
      console.log('I have found the response to delete');
      const deleted = JSON.parse(JSON.stringify( this.currentQuestion.responses
      .filter(sub => (sub.cloudRowId != DelResponse.cloudRowId))));
      this.currentQuestion.responses = [];
      this.currentQuestion.responses=deleted;
      this.currentResponse = null;
    } else {console.log('I did not find the response. index=' + index) }

  }
  public deleteCurrentQuestion(DelQuestion: Question) {
    console.log('delete current question')
    console.log(DelQuestion)
    if (DelQuestion === null) return;
    if (this.currentSubject.questions === null){
      this.currentSubject.questions = [];
      return;
    }
    console.log('I am looking for the question to delete');
    const index = this.currentSubject.questions
    .findIndex(q=>q.cloudRowId == DelQuestion.cloudRowId);

    if (index>-1){
      console.log('I have found the question to delete');
      const deleted = JSON.parse(JSON.stringify( this.currentSubject.questions
      .filter(sub => (sub.cloudRowId != DelQuestion.cloudRowId))));
      this.currentSubject.questions = [];
      this.currentSubject.questions = deleted;
      this.currentQuestion = null;
    } else {console.log('I did not find the question') }
  }

  public mergeCurrentQuestion()
  {
    if (this.currentQuestion === undefined ||  this.currentQuestion === null) return;
    if ( this.currentSubject.questions === undefined || this.currentSubject.questions === null)  this.currentSubject.questions = [];

    const index = this.currentSubject.questions.findIndex(q=>q.cloudRowId === this.currentQuestion.cloudRowId );
    if (index===-1) {
      this.currentSubject.questions.push(this.currentQuestion);
    } else {
      var merged = this.currentSubject.questions.filter(q=>q.cloudRowId != this.currentQuestion.cloudRowId );
      merged.push(this.currentQuestion)
      this.currentSubject.questions = [];
      this.currentSubject.questions=merged;
    }
  }

  public mergeCurrentResponse()
  {
    if (this.currentQuestion === undefined ||  this.currentQuestion === null) {return};
    if (this.currentResponse === undefined ||  this.currentResponse === null) return;
    if (this.currentQuestion.responses === undefined || this.currentQuestion.responses === null ) this.currentQuestion.responses = [];
    if (this.currentQuestion.responses === [null] ) this.currentQuestion.responses =[];
    const index = this.currentQuestion.responses.findIndex(q=>q.cloudRowId == this.currentResponse.cloudRowId );
    if (index===-1) {
      this.currentQuestion.responses.push(this.currentResponse);
    } else {
      var merged = this.currentQuestion.responses.filter(q=>q.cloudRowId != this.currentResponse.cloudRowId );
      merged.push(this.currentResponse)
      this.currentQuestion.responses = [];
      this.currentQuestion.responses=merged;
    }
  }

  public saveCurrentSubject()
  {
    this.mergeCurrentResponse();
    this.mergeCurrentQuestion();
    if (this.currentSubject.subjectRowId === undefined || this.currentSubject.subjectRowId === null )
    {

      this.store.dispatch(SubjectsApiActions.createSubject({ Subject: JSON.parse(JSON.stringify(this.currentSubject)) }));
    }
    else{
      this.store.dispatch(SubjectsApiActions.updateSubject({ Subject: JSON.parse(JSON.stringify(this.currentSubject)) }));
    }
  }

  public deleteCurrentSubject(){
    if (this.currentSubject.subjectRowId === undefined || this.currentSubject.subjectRowId === null )
    {
      this.store.dispatch(SubjectPageActions.clearCurrentSubject());
    }
    else{
      this.store.dispatch(SubjectsApiActions.deleteSubject({Subject: this.currentSubject}));
    }
  }

  public cancelEdit(){
    this.store.dispatch(SubjectPageActions.clearCurrentSubject());
  }

  get isDirty(): boolean {
    return JSON.stringify(this.originalSubject) !== JSON.stringify(this.currentSubject);
  }

  isValid(path?: string): boolean {
    return false;
  }

}
