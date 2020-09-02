import { HabitansType } from './habitans-type.model';
import { TypeOfSample } from './type-of-sample.model';
export declare class Habitan {
    readonly id: string;
    label: string;
    htypes: HabitansType[];
    type_of_samples: TypeOfSample[];
}
