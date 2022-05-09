import { IModel } from './model.interface';
import { ISemester } from './semester.interface';
import { ISpecialization } from './specialization.interface';
import { IStudyMode } from './studyMode.interface';

export interface IPersonalDataResponse {
    semesters: ISemester[];
    specializations: ISpecialization[];
    studyMode: IStudyMode;
    texts: IText[];
}

export interface IPersonalData {
    surname: string;
    givenName: string;
    semester: ISemester | null;
    specialization: ISpecialization | null;
    studyMode: { id: number; label: string } | null;
}

interface IText extends IModel {
    name: String;
    content: String;
}
