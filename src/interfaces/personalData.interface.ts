import { Semester } from './semester.interface';
import { Specialization } from './specialization.interface';
import { StudyMode } from './studyMode.interface';

export interface PersonalDataResponse {
    semesters: Semester[];
    specializations: Specialization[];
    studyMode: StudyMode;
}

export interface PersonalData {
    surname: string;
    givenName: string;
    semester: Semester | undefined;
    specialization: Specialization | undefined;
    studyMode: { id: number; label: string } | undefined;
}
