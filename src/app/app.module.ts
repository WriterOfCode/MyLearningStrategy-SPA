import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { RouterState, StoreRouterConnectingModule } from "@ngrx/router-store";
import { AppReducers } from "./shared/state";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material-module';
import { OriginatorInterceptor } from './shared/interceptors/originator.interceptor';
/* Feature Modules */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* Feature Controls */
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment,protectedResources, msalConfig, basicLoginRequest } from 'src/environments/environment';
import { AzureStorageModule } from './azure-storage/azure-storage.module';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { BussyIndicatorModule } from './shared/bussy-indicator/bussy-indicator.module';
import { AlertsComponent } from './shared/alerts/alerts.component';
import { IPublicClientApplication, PublicClientApplication, InteractionType, LogLevel } from '@azure/msal-browser';
import { MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';


/**
 * Enter here the coordinates of your web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}
/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */
 export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
 export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest:basicLoginRequest,
    loginFailedRoute: 'login-failed'
  };
}


/**
 * MSAL Angular will automatically retrieve tokens for resources
 * added to protectedResourceMap. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set( protectedResources.mlsApi.endpoint,  protectedResources.mlsApi.scopes);
  protectedResourceMap.set( protectedResources.armTenants.endpoint,  protectedResources.armTenants.scopes);
  protectedResourceMap.set( protectedResources.graphMe.endpoint,  protectedResources.graphMe.scopes);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

@NgModule({
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AzureStorageModule,
    MaterialModule,
    NgbModule,
    MsalModule,
    StoreModule.forRoot(AppReducers.mlsReducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
        strictActionTypeUniqueness: true,
      }
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot( { stateKey: 'router', routerState: RouterState.Minimal } ),
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    AboutComponent,
    AlertsComponent,
    PrivacyPolicyComponent,
  ],
  exports: [MaterialModule, CommonModule, BussyIndicatorModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OriginatorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    OriginatorInterceptor
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
