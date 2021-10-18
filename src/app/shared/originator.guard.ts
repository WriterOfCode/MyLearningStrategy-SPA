import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserProfile } from './models/user-profile';
import { Store } from '@ngrx/store';
import { State } from '../shared/auth/state/auth.selectors';
import { getCurrentUserProfile } from '../../app/shared/auth/state/auth.selectors';
import { MsalService } from '@azure/msal-angular';
import { UserProfilesService } from './services/user-profiles.service';
import { AuthenticationAPIActions } from './auth/state/actions';



@Injectable({
  providedIn: 'root'
})
export class OriginatorGuard implements CanActivate {
  public userProfile: IUserProfile;
  constructor(  private store: Store<State>,
    private authService: MsalService,
    private userProfileServce: UserProfilesService
    ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let returnValue: boolean;
      returnValue = false;
      this.checkAndSetActiveAccount();
      this.store.select(getCurrentUserProfile).subscribe(up=> {
        this.userProfile =up;
        returnValue = true;
      },error=>{console.error(error);
              returnValue = false; }
      )
      return returnValue;
  }

  checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();
    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
      activeAccount = this.authService.instance.getActiveAccount();
    }
    if (activeAccount){
      this.store.dispatch(AuthenticationAPIActions.setSignedInAccount({ signedInAccount: activeAccount}));
      this.userProfileServce.getUserProfileExt(
        activeAccount.localAccountId,
        activeAccount.environment,
        activeAccount.username,
        activeAccount.name
        )
        .toPromise().then(profile => {
          this.userProfile = profile;
          this.store.dispatch(AuthenticationAPIActions.setCurrentLoggedInUser ({ currentLogedInUser : this.userProfile }));
        });
    }
  }
}
