import { Semester } from './semester.interface';

export interface Theses {
    starts: Semester[];
    theses: Array<{ id: number; name: string }>;
}
