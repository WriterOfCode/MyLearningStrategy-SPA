import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SubjectEditService } from '../subject-edit.service';

import { QuestionEditComponent } from './question-edit.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionEditGuard implements CanDeactivate<QuestionEditComponent>,  CanActivate, CanActivateChild {
  constructor(public subEditSrv: SubjectEditService) {}
  canDeactivate(component: QuestionEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
  this.subEditSrv.mergeCurrentQuestion();
  return true;
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.subEditSrv.mergeCurrentQuestion();
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.subEditSrv.mergeCurrentQuestion();
    return true;
  }

}
