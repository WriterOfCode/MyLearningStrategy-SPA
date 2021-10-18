import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubjectEditService } from '../subject-edit.service';
import { Response } from '../../shared/models/subjects-complete'

@Injectable({
  providedIn: 'root'
})
export class ResponsesListResolver implements Resolve<Response[]> {
  constructor(private subEditSrv: SubjectEditService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response[]> {
    return of( this.subEditSrv.currentQuestion.responses);
  }
}
