import { Model } from './model.interface';

export interface StudyMode extends Model {
    studyModes: Array<{ id: number; label: string }>;
    tooltip?: String;
}
