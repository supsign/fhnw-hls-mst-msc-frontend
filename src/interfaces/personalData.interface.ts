import { Semester } from './semester.interface';
import { Specialization } from './specialization.interface';
import { StudyMode } from './studyMode.interface';

export interface PersonalDataResponse {
    semesters: Semester[];
    specializations: Specialization[];
    studyMode: StudyMode;
}
