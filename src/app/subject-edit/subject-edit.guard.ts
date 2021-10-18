import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate, CanLoad } from '@angular/router';

import { Observable } from 'rxjs';
import { SubjectEditShellComponent } from './subject-edit-shell.component';

@Injectable({
  providedIn: 'root'
})
export class SubjectEditGuard implements CanDeactivate<SubjectEditShellComponent>, CanActivate {


  canDeactivate(component: SubjectEditShellComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return true;
  }

  canActivate(currentRoute: ActivatedRouteSnapshot,
              currentState: RouterStateSnapshot,
              nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
                return true;
    }

  canActivateChild(
      component: SubjectEditShellComponent,
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return confirm(`Navigate away and lose all changes?`);
    }
}
