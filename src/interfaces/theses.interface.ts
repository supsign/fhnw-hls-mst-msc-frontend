import { IModel } from './model.interface';
import { ISemester } from './semester.interface';
import { IText } from './text.interface';

export interface IThesis extends IModel {
    name: string;
}

export interface IThesisDataResponse {
    theses: IThesis[];
    time_frames: IThesisTimeFrame[];
    texts: IText[];
}
export interface IThesisTimeFrame {
    end: string;
    start: ISemester;
}

export interface ThesisRequestData {
    specialization: number;
}

export interface IThesisSelection {
    start: IThesisTimeFrame | null;
    theses: IThesis[] | [];
    furtherDetails: string;
}
