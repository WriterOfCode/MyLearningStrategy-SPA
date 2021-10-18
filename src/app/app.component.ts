import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionType, InteractionStatus, PopupRequest, RedirectRequest, AuthenticationResult, AuthError } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { switchMap, filter, takeUntil, tap } from 'rxjs/operators';
// import { b2cPolicies } from './b2c-config';
import { AuthenticationAPIActions } from './shared/auth/state/actions';
import { State } from '../app/shared/auth/state/auth.selectors';
import { Store } from '@ngrx/store';
import { IUserProfile } from '../app/shared/models/user-profile';
import { UserProfilesService } from '../app/shared/services/user-profiles.service';
import { environment } from 'src/environments/environment';
interface Payload extends AuthenticationResult {
  idTokenClaims: {
    tfp?: string
  }
}


@Component({
  selector: 'mls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'My Learning Strategy';
  isIframe = false;
  loginDisplay = false;
  faCoffee = faCoffee;
  private readonly _destroying$ = new Subject<void>();

  public currentLogedInUser: any;
  public userToken: any;
  public authenticatonAuthority: any;
  public userProfile: IUserProfile;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private store: Store<State>,
    private userProfileServce: UserProfilesService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.setLoginDisplay();

    });


    this.msalBroadcastService.msalSubject$
    .pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      takeUntil(this._destroying$),
      tap((result: EventMessage) => this.store.dispatch(AuthenticationAPIActions.setAuthenticatonAuthority ({ authenticatonAuthority: result}))),
    )
    .subscribe((result: EventMessage) => {
      if (result?.payload) {
        const payload: AuthenticationResult = result.payload as AuthenticationResult
        this.authService.instance.setActiveAccount(payload.account);
        this.store.dispatch(AuthenticationAPIActions.setAuthenticationResult({AuthenticationResult: payload}))

      }

      // this.checkAndSetActiveAccount();
      let activeAccount = this.authService.instance.getActiveAccount();
      if (activeAccount){
        console.log('checkAndSetActiveAccount activeAccount not so');
        this.store.dispatch(AuthenticationAPIActions.setSignedInAccount({ signedInAccount: activeAccount}));
        this.userProfileServce.getUserProfileExt(
          activeAccount.localAccountId,
          activeAccount.environment,
          activeAccount.username,
          activeAccount.name
          )
          .toPromise().then(profile => {
            this.userProfile = profile;
            console.log('msal:postloginSucess-UserProfile');
            this.store.dispatch(AuthenticationAPIActions.setCurrentLoggedInUser ({ currentLogedInUser : this.userProfile }));
          });
      }
    });

    this.msalBroadcastService.msalSubject$
    .pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      takeUntil(this._destroying$),
    )
    .subscribe((result: EventMessage) => {
      console.log('ACQUIRE_TOKEN_SUCCESS activeAccount not so');
      console.log(result.payload);
    });

    // this.msalBroadcastService.msalSubject$
    //   .pipe(
    //     filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
    //     takeUntil(this._destroying$),
    //     tap((result: EventMessage) => this.store.dispatch(AuthenticationAPIActions.setAuthenticatonAuthority ({ authenticatonAuthority: result}))),
    //     switchMap(
    //       ( result: EventMessage) =>{

    //         // let payload: Payload = <AuthenticationResult>result.payload;

    //         // this.store.dispatch(AuthenticationAPIActions.setSignedInAccount({ signedInAccount: this.authService.instance.getActiveAccount()}));
    //         this.store.dispatch(AuthenticationAPIActions.setAuthenticatonAuthority ({ authenticatonAuthority: result}));
    //         // /**
    //         //  * For the purpose of setting an active account for UI update, we want to consider only the auth response resulting
    //         //  * from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy policies may use "acr" instead of "tfp").
    //         //  * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
    //         //  */
    //         // if (payload.idTokenClaims['tfp'] === b2cPolicies.names.editProfile) {
    //         //   window.alert('Profile has been updated successfully. \nPlease sign-in again.');
    //         //   return this.logout();
    //         // }

    //         let activeAccount = this.authService.instance.getActiveAccount();
    //         if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
    //           let accounts = this.authService.instance.getAllAccounts();
    //           this.authService.instance.setActiveAccount(accounts[0]);
    //           return this.userProfileServce.getUserProfileExt(
    //             this.authService.instance.getActiveAccount().localAccountId,
    //             this.authService.instance.getActiveAccount().environment,
    //             this.authService.instance.getActiveAccount().username,
    //             this.authService.instance.getActiveAccount().name
    //           )
    //         }

    //       }
    //     )
    //   )
    //   .subscribe((user: IUserProfile) => {
    //     this.store.dispatch(AuthenticationAPIActions.setCurrentLoggedInUser ({ currentLogedInUser : user }));


    //     // /**
    //     //  * For the purpose of setting an active account for UI update, we want to consider only the auth response resulting
    //     //  * from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy policies may use "acr" instead of "tfp").
    //     //  * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
    //     //  */
    //     // if (payload.idTokenClaims['tfp'] ===  environment.b2cPolicies.authorities.editProfile) {
    //     //   window.alert('Profile has been updated successfully. \nPlease sign-in again.');
    //     //   return this.logout();
    //     // }

    //     // return result;
    //   });

    //   this.msalBroadcastService.msalSubject$
    //   .pipe(
    //     filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_FAILURE || msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE),
    //     takeUntil(this._destroying$)
    //   )
    //   .subscribe((result: EventMessage) => {
    //     console.log(result.error);
    //     // Add your auth error handling logic here
    //   });


    // activeAccount = this.authService.instance.getActiveAccount();
    // if (activeAccount){
    //   console.log('checkAndSetActiveAccount activeAccount not so');
    //   this.store.dispatch(AuthenticationAPIActions.setSignedInAccount({ signedInAccount: activeAccount}));
    //   this.userProfileServce.getUserProfileExt(
    //     activeAccount.localAccountId,
    //     activeAccount.environment,
    //     activeAccount.username,
    //     activeAccount.name
    //     )
    //     .toPromise().then(profile => {
    //       this.userProfile = profile;
    //       console.log('msal:postloginSucess-UserProfile');
    //       this.store.dispatch(AuthenticationAPIActions.setCurrentLoggedInUser ({ currentLogedInUser : this.userProfile }));
    //     });
    // }
    // console.log('checkAndSetActiveAccount - out');
  }


  checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
     console.log('checkAndSetActiveAccount - in');
    let activeAccount = this.authService.instance.getActiveAccount();
    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  getProfile(){
    this.checkAndSetActiveAccount();
  }
  editProfile() {
    let editProfileFlowRequest = {
      scopes: ["openid"],
      authority: environment.b2cPolicies.authorities.editProfile.authority,
    };
    this.login(editProfileFlowRequest);
  }

  setLoginDisplay() {
    console.log('setLoginDisplay');
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  login(userFlowRequest?: RedirectRequest | PopupRequest) {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({...this.msalGuardConfig.authRequest, ...userFlowRequest} as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService.loginPopup(userFlowRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest);
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }


  logout() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect();
      // this.authService.logout();
    }
  }


  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
