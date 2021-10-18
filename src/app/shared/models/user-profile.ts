import {Guid} from 'guid-typescript';
import { AuthenticationResult } from '@azure/msal-browser';
export interface UserProfileState {
  currentUserProfile: UserProfile | null;
  authenticatonAuthority: any | null;
  authenticationResult: AuthenticationResult | null;
  signedInAccount: any | null;
  isLoggedIn: boolean;
  isBussy: boolean;
  error?: any;
}

export interface UserProfileResolved {
  userprofile: IUserProfile | null;
  error?: any;
}

export class UserProfileLookupProps {
  userIdentifier: string;
  identityProviders: string;
  displayableId: string;
  name: string;
}

export class UserProfile implements IUserProfile {
  userProfileId: number;
  externalID: string;
  displayName: string;
  emailAddress?: any;
  firstName?: any;
  lastName?: any;
  postalCode?: any;
  identityProvider: string;
  imageDevice?: any;
  imageCloud?: any;
  imageHash: number;
  originator: Guid;
  lastModifiedOffset: Date;
  hasLoggedIn: boolean;
  isLocked: boolean;
  isDisabled: boolean;
  isDeleted: boolean;
  surname?: string;
  givenName?: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: string;
}
export interface IUserProfile {
  userProfileId: number;
  externalID: string;
  displayName: string;
  emailAddress?: any;
  firstName?: any;
  lastName?: any;
  postalCode?: any;
  identityProvider: string;
  imageDevice?: any;
  imageCloud?: any;
  imageHash: number;
  originator: Guid;
  lastModifiedOffset: Date;
  hasLoggedIn: boolean;
  isLocked: boolean;
  isDisabled: boolean;
  isDeleted: boolean;
  surname?: string;
  givenName?: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: string;
}
