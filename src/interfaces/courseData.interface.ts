import { Semester } from './semester.interface';
import { Model } from './model.interface';

export interface CourseDataResponse {
    courses: CourseGroup[];
    semesters: Semester[];
    texts: Array<{ id: number; name: string; content: string }>;
    theses: [];
}

export interface CourseGroup extends Model {
    course_group_type_short_name: string;
    course_group_type_tooltip: string;
    courses: Course[];
    description?: string;
    internal_name: string;
    name: string;
    required_courses_count: number;
    title: string;
    type: number;
}

export interface Course extends Model {
    content: string;
    ects: number;
    end_semester: Semester;
    internal_name: string;
    name: string;
    short_name: string;
}
