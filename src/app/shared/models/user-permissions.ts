import {Guid} from 'guid-typescript';

export interface IUserPermissions {
  PermissionsId: string;
  Originator: Guid;
  ClaimType: string;
  ClaimValue: string;
  CloudRowId: Guid;
}

export interface UserPermissionsResolved {
  userPermission: UserPermissions;
  error?: any;
}

export class UserPermissions implements IUserPermissions {
  PermissionsId: string;  Originator: Guid;
  ClaimType: string;
  ClaimValue: string;
  CloudRowId: Guid;
}
