import {Guid} from 'guid-typescript';
import { Category } from './category';
export interface CompleteSubject {
      subjectRowId: Guid;
      originator: Guid;
      title: string;
      description: string;
      imageDevice: string;
      imageCloud: string;
      isShared: boolean;
      hasBeenShared: boolean;
      tags: string[];
      questions: Question[];
      categories: Category[];
      lastModifiedOffset: Date;
      cloudRowId: string;
  }

export interface Question {
    orderBy: number;
    question:	string;
    image_1_Device:	string;
    image_1_Cloud:	string;
    image_2_Device:	string;
    image_2_Cloud:	string;
    image_3_Device:	string;
    image_3_Cloud:	string;
    hyperlink_1:	string;
    hyperlink_2:	string;
    hyperlink_3:	string;
    mnemonic:	string;
    responses: any[];
    lastModifiedOffset:	Date;
    cloudRowId:	string;
  }

export interface Response {
    orderBy: number;
    response:	string;
    isCorrect:	boolean;
    image_1_Device:	string;
    image_1_Cloud:	string;
    image_2_Device:	string;
    image_2_Cloud:	string;
    image_3_Device:	string;
    image_3_Cloud:	string;
    hyperlink_1:	string;
    hyperlink_2:	string;
    hyperlink_3:	string;
    mnemonic:	string;
    lastModifiedOffset: Date;
    cloudRowId: string;
  }
