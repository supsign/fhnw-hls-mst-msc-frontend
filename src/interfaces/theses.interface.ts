import { IModel } from './model.interface';
import { ISemester } from './semester.interface';

export interface IThesis extends IModel {
    name: string;
}

export interface IThesisDataResponse {
    theses: IThesis[];
    time_frames: IThesisTimeFrame[];
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
