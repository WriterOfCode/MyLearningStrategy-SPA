import { Injectable } from '@angular/core';
import { Resolve, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubjectEditService } from '../subject-edit.service';
import { Question } from '../../shared/models/subjects-complete'

@Injectable({
  providedIn: 'root'
})
export class QuestionsResolverService implements Resolve<Question[]> {
  constructor(private subEditSrv: SubjectEditService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Question[]> {
    return of( this.subEditSrv.currentSubject.questions)
  }
}