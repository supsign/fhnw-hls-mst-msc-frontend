import { Model } from './model.interface';
import { Semester } from './semester.interface';

export interface ISelectedCourses {
    course: ICourse;
    semester: Semester;
}

export interface ICourse extends Model {
    content: string;
    ects: number;
    end_semester_id: number;
    internal_name: string;
    name: string;
    short_name: string;
    semester_type: number;
    selected_semester: Semester | String | null;
}
