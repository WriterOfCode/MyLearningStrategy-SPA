import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUserProfile } from '../models/user-profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfilesService {
  constructor(private http: HttpClient) {}

  getUserProfileExt(userIdentifier: string, identityProviders: string, displayableId: string, name: string): Observable<IUserProfile> {
    const paramiters = new HttpParams()
    .set('ExternalID', userIdentifier)
    .set('IdentityProvider', identityProviders)
    .set('DisplayName', displayableId)
    .set('FirstName', name);

    return this.http.get<IUserProfile>(
      `${environment.mslBaseApiUrl}/api/UserProfiles`, {params: paramiters})
      .pipe(catchError(this.handleError));
  }
  updateUserProfile(userProfile: IUserProfile): Observable<IUserProfile> {
    return this.http.put<IUserProfile>(`${environment.mslBaseApiUrl}/api/UserProfiles`, userProfile)
    .pipe(catchError(this.handleError));
  }
  private onErrorReturnDefault<T>( defaultvalue?: T) {
    return (error: any): Observable<T> => {
      return of(defaultvalue as T);
    };
  }
  handleError(error: { error: { message: any; }; status: any; message: any; }) {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(JSON.stringify(errorMessage));
    return throwError(errorMessage);
  }
}
