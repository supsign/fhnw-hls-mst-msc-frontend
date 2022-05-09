import { IModel } from './model.interface';
import { Semester } from './semester.interface';
import { Specialization } from './specialization.interface';
import { StudyMode } from './studyMode.interface';

export interface IPersonalDataResponse {
    semesters: Semester[];
    specializations: Specialization[];
    studyMode: StudyMode;
    texts: IText[];
}

export interface IPersonalData {
    surname: string;
    givenName: string;
    semester: Semester | null;
    specialization: Specialization | null;
    studyMode: { id: number; label: string } | null;
}

interface IText extends IModel {
    name: String;
    content: String;
}
