import { Semester } from './semester.interface';
import { IModel } from './model.interface';
import { Specialization } from './specialization.interface';
import { ICourse } from './course.interface';

export interface CourseDataResponse {
    courses: [CourseGroup[]];
    semesters: Semester[];
    texts: Array<{ id: number; name: string; content: string }>;
    theses: [];
    optional_courses: { courses: ICourse; texts: [] };
}

export interface CourseGroup extends Model {
    course_group_type_short_name: string;
    course_group_type_tooltip: string;
    courses: ICourse[];
    description?: string;
    internal_name: string;
    name: string;
    required_courses_count: number;
    title: string;
    type: number;
    specializations: Specialization[];
    clusters: Cluster[];
    tooltip: string;
}

export interface Cluster extends IModel {
    core_competences: string;
    courses: ICourse[];
    name: string;
}
