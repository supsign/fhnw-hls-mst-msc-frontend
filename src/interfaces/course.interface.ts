import { Cluster } from './courseData.interface';
import { IModel } from './model.interface';
import { Semester } from './semester.interface';
import { Specialization } from './specialization.interface';
import { IText } from './text.interface';
import { Theses } from './theses.interface';

export interface ICourseDataResponse {
    courses: ICourseGroup[][];
    semesters: Semester[];
    texts: IText[];
    theses: Theses;
    optional_courses: { courses: ICourse[]; texts: IText[] };
}

export interface ICourseGroup extends IModel {
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

export interface ICourse extends IModel {
    content: string;
    ects: number;
    end_semester_id: number;
    internal_name: string;
    name: string;
    short_name: string;
    semester_type: number;
    selected_semester: Semester | String | null;
}

export interface ISelectedCourses {
    course: ICourse;
    semester: Semester;
}
