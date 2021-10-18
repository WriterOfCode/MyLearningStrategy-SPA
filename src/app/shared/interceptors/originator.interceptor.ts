import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';

import { State,getUserProfile, getCurrentUserProfile } from '../auth/state/auth.selectors'
import { UserProfileState } from '../models/user-profile';

@Injectable()
export class OriginatorInterceptor implements HttpInterceptor {
  userProfile: UserProfileState;
  constructor( private store: Store<State>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.store.select(getUserProfile)
    .subscribe(data=>{
      this.userProfile = data
      if (this.userProfile === undefined || this.userProfile === null) {
        req = req.clone({
          setHeaders: {
            Originator:  Guid.EMPTY,
            'user-originator':   Guid.EMPTY,
            'Content-Type':  'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*'
          }
        });
        return next.handle(req);
      }
      else {
        req = req.clone({
          setHeaders: {
            'Originator': this.userProfile.currentUserProfile.originator.toString(),
            'Content-Type':  'application/json, text/plain, */*',
            'Access-Control-Allow-Headers': 'Content-Type,Originator,Access-Control-Allow-Origin',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + this.userProfile.authenticationResult.idToken,
          }
        });
        return next.handle(req);
      }
    });




    return next.handle(req.clone());
  }
}
