import { IModel } from './model.interface';
import { Semester } from './semester.interface';

export interface Theses {
    starts: Semester[];
    theses: Array<{ id: number; name: string }>;
    furtherDetails: string;
}

export interface IThesis extends IModel {
    name: string;
}

export interface IThesisDataResponse {
    theses: IThesis[];
    time_frames: IThesisTimeFrame[];
}
export interface IThesisTimeFrame {
    end: string;
    start: Semester;
}

export interface ThesisRequestData {
    specialization: number;
}
export interface IThesisSelection {
    start: IThesisTimeFrame | null;
    theses: IThesis[] | [];
    furtherDetails: string;
}
