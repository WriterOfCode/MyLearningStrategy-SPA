/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */
 import { LogLevel, Configuration, BrowserCacheLocation, AuthenticationScheme } from '@azure/msal-browser';

 const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;


export const environment = {
  production: true,
  mslBaseApiUrl: 'https://mylearningstrategywebapi.azurewebsites.net',
  mslDocumentDBApiUrl: 'https://mylearningstrategywebapi.azurewebsites.net',
  sasGeneratorUrl: 'https://mylearningstrategyfunccont.azurewebsites.net',

  redirectUri: 'https://mylearningstrategy.com',
  postLogoutRedirectUri: 'https://mylearningstrategy.com',

  b2cPolicies: {
    clientId: '79381053-3cc8-43a0-a69b-d1bddee40403',
    authorityDomain:"mylearningstrategy.b2clogin.com",
    authorities:{
      signUpSignIn: {
        name:'B2C_1_SUSI',
        authority: 'https://mylearningstrategy.b2clogin.com/mylearningstrategy.onmicrosoft.com/B2C_1_SUSI'
      },
      resetPassword: {
        name: 'B2C_1_RESET',
        authority: 'https://mylearningstrategy.b2clogin.com/mylearningstrategy.onmicrosoft.com/B2C_1_RESET'
      },
      editProfile: {
        name: 'B2C_1_EDIT_PROFILE',
        authority: 'https://mylearningstrategy.b2clogin.com/mylearningstrategy.onmicrosoft.com/B2C_1_EDIT_PROFILE'
      },
    },
  },
};

 /**
  * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
  */
  export const protectedResources = {
    graphMe: {
        endpoint: "https://graph.microsoft.com/v1.0/me",
        scopes: ["User.Read"],
    },
    armTenants: {
        endpoint: "https://management.azure.com/tenants",
        scopes: ["https://management.azure.com/user_impersonation"],
    },
    mlsApi: {
      endpoint: "https://mylearningstrategy.onmicrosoft.com/scopes",
      scopes: ["subject_readwrite","strategies_readwrite"],
    },
  }


  /**
   * Scopes you add here will be prompted for user consent during sign-in.
   * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
   * For more information about OIDC scopes, visit:
   * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
   */
   export const basicLoginRequest = {
     scopes: ["openid"],
     authenticationScheme: AuthenticationScheme.BEARER,
   };
   export const silentRequest = {
     scopes: [...protectedResources.mlsApi.scopes],
     authenticationScheme: AuthenticationScheme.POP,
     resourceRequestMethod: "GET,PUT,POST,DELETE",
     resourceRequestUri: protectedResources.mlsApi.endpoint,
   };

   /**
    * Configuration object to be passed to MSAL instance on creation.
    * For a full list of MSAL.js configuration parameters, visit:
    * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
    */
   export const msalConfig: Configuration = {
      auth: {
          clientId: environment.b2cPolicies.clientId, // This is the ONLY mandatory field that you need to supply.
          authority: environment.b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
          knownAuthorities: [environment.b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
          redirectUri: '/', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
          postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
          navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
      },
      cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
          storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
      },
      system: {
          loggerOptions: {
              loggerCallback(logLevel: LogLevel, message: string) {
                  console.log(message);
              },
              logLevel: LogLevel.Error,
              piiLoggingEnabled: false
          }
      }
   }



