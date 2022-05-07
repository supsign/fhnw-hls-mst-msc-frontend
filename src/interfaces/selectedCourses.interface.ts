import { ICourse } from './course.interface';

export interface SelectedCourses {
    semesterId: number | string;
    courses: Array<ICourse>;
}
