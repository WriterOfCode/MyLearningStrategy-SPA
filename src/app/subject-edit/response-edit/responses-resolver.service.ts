import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubjectEditService } from '../subject-edit.service';


@Injectable({
  providedIn: 'root'
})
export class ResponsesResolverService implements Resolve<Response[]> {

  constructor(private subEditSrv: SubjectEditService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response[]> {
    return of( this.subEditSrv.currentQuestion.responses)
  }
}