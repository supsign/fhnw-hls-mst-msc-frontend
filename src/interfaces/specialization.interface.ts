import { Course } from './courseData.interface';
import { Model } from './model.interface';

export interface Specialization extends Model {
    name: String;
    short_name: String;
    cluster_id: number;
    courses: Course[];
}
