import {Guid} from 'guid-typescript';

export interface Strategy {
    id: number;
    userProfileId: number;
    name: string;
    description: string;
    sortRuleId: number;
    questionSelection: number;
    responseSelection: number;
    onlyCorrect:	boolean;
    recycleIncorrectlyAnswered:	boolean;
    lastModifiedOffset: Date;
    cloudRowId: Guid;
  }

  export class Strategy implements Strategy {
    public id: number;
    public userProfileId: number;
    public name: string;
    public description: string;
    public sortRuleId: number;
    public questionSelection: number;
    public responseSelection: number;
    public onlyCorrect:	boolean;
    public recycleIncorrectlyAnswered:	boolean;
    public lastModifiedOffset: Date;
    public cloudRowId: Guid;
  }
