import { ICourse } from './course.interface';
import { IModel } from './model.interface';

export interface Specialization extends IModel {
    name: String;
    short_name: String;
    cluster_id: number;
    courses: ICourse[];
}
