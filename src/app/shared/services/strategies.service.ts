import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, protectedResources } from 'src/environments/environment';
import { Strategy } from '../models/strategy'
import { AuthenticationScheme, InteractionRequiredAuthError } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
@Injectable({
  providedIn: 'root'
})
export class StrategiesService {
  constructor(private http: HttpClient, private authService: MsalService) {}

  async getToken(method: string, query?: string) {

    const loginRequest = {
      scopes: [...protectedResources.mlsApi.scopes],
      authenticationScheme: AuthenticationScheme.POP,
      resourceRequestMethod: method,
      resourceRequestUri: query ? protectedResources.mlsApi.endpoint + query : protectedResources.mlsApi.endpoint,
    }

    return this.authService.acquireTokenSilent({
      account: this.authService.instance.getActiveAccount() ? this.authService.instance.getActiveAccount()! : this.authService.instance.getAllAccounts()[0]!,
      ...loginRequest,
    }).toPromise()
      .then((result) => {
        return result.accessToken;
      })
      .catch((error) => {
        console.log(error)
        if (InteractionRequiredAuthError.isInteractionRequiredError(error.errorCode)) {
          this.authService.acquireTokenPopup(loginRequest).toPromise().then((result) => {
            return result.accessToken;
          });
        }
      });
  }
  async getStrategies2(): Promise<Observable<Strategy[]>> {
    const accessToken = await this.getToken("GET");

    return this.http.get<Strategy[]>(`${environment.mslBaseApiUrl}/api/LearningStrategies`, {headers: {"Authorization": `PoP ${accessToken}`}});
  }

//calling code has to be fixed.
  getStrategies(): Observable<Strategy[]> {
    // const accessToken = await this.getToken("GET");

    // return this.http.get<Strategy[]>(`${environment.mslBaseApiUrl}/api/LearningStrategies`, {headers: {"Authorization": `PoP ${accessToken}`}});
    return this.http.get<Strategy[]>(`${environment.mslBaseApiUrl}/api/LearningStrategies`);
  }
  getStrategy( id: number): Observable<Strategy> {
    return this.http.get<Strategy>(`${environment.mslBaseApiUrl}/api/LearningStrategies/${id}`);
    // .pipe(catchError(this.onErrorReturnDefault<Strategy>(null)));
  }
  addStrategy(strategy: Strategy): Observable<Strategy> {
    return this.http.post<Strategy>(`${environment.mslBaseApiUrl}/api/LearningStrategies`, strategy );
    // .pipe(catchError(this.onErrorReturnDefault<Strategy>(null)));
  }
  updateStrategy(strategy: Strategy): Observable<Strategy> {
    return this.http.put<Strategy>(`${environment.mslBaseApiUrl}/api/LearningStrategies`, strategy);
    // .pipe(catchError(this.onErrorReturnDefault<Strategy>(null)));
  }
  deleteStrategy(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.mslBaseApiUrl}/api/LearningStrategies/${id}`);
    // .pipe(catchError(this.onErrorReturnDefault<boolean>(false)));
  }
}


