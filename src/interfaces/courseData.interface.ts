import { Semester } from './semester.interface';
import { IModel } from './model.interface';
import { Specialization } from './specialization.interface';
import { ICourse } from './course.interface';

export interface Cluster extends IModel {
    core_competences: string;
    courses: ICourse[];
    name: string;
}
