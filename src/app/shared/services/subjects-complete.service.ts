import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CompleteSubject  } from '../models/subjects-complete';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubjectsCompleteService {

  constructor(private http: HttpClient) { }

  getSharedSubjects(): Observable<CompleteSubject[]> {
    return this.http.get<CompleteSubject[]>(`${environment.mslDocumentDBApiUrl}/api/SharedSubjects`)
      // .pipe(catchError(this.handleError));
      .pipe(catchError(this.onErrorReturnDefault<CompleteSubject[]>([])));
    }


    getSubjects(): Observable<CompleteSubject[]> {
    return this.http.get<CompleteSubject[]>(`${environment.mslDocumentDBApiUrl}/api/Subjects`)
      // .pipe(catchError(this.handleError));
      .pipe(catchError(this.onErrorReturnDefault<CompleteSubject[]>([])));
    }

  saveNewSubject(completeSubject: CompleteSubject): Observable<CompleteSubject> {
      return this.http.post<CompleteSubject>(`${environment.mslDocumentDBApiUrl}/api/Subjects`, completeSubject)
  }

  updateSubject(completeSubject: CompleteSubject): Observable<CompleteSubject> {
      return this.http.put<CompleteSubject>(`${environment.mslDocumentDBApiUrl}/api/Subjects`, completeSubject)
      // .pipe(catchError(this.onErrorReturnDefault<CompleteSubject>(null )));
  }
//Subjects?subjectRowId=
  deleteSubject(_id: any): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.mslDocumentDBApiUrl}/api/Subjects?subjectRowId=${_id}`)
    // .pipe(catchError(this.handleError));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param defaultvalue - optional value to return as the observable defaultvalue
   */
  private onErrorReturnDefault<T>( defaultvalue?: T) {
    return (error: any): Observable<T> => {
      return of(defaultvalue as T);
    };
  }
  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    return throwError(errorMessage);
  }
}
