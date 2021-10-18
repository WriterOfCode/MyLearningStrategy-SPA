import {Guid} from 'guid-typescript';

export interface Category {
  id: number;
  userProfileId: number;
  categoryName: string;
  imageDevice?: any;
  imageCloud?: any;
  imageHash: number;
  lastModifiedOffset: Date;
  cloudRowId: Guid;
}

export class Category implements Category {
  public id: number;
  public userProfileId: number;
  public categoryName: string;
  public imageDevice?: any;
  public imageCloud?: any;
  public imageHash: number;
  public lastModifiedOffset: Date;
  public cloudRowId: Guid;
}