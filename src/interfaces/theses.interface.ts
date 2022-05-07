import { Semester } from './semester.interface';

export interface Theses {
    starts: Semester[];
    theses: Array<{ id: number; name: string }>;
    furtherDetails: string;
}
export interface ThesisRequestData {
    specialization: number;
}
export interface ThesesSelection {
    start: Semester | undefined;
    theses: Array<{ id: number; name: string }> | [];
    furtherDetails: string;
}
