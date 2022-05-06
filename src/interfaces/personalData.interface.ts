import { Semester } from './semester.interface';

export interface PersonalDataResponse {
    semesters: Semester[];
    specializations: any;
    studyMode: Object;
}
