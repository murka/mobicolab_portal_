import { Habitan } from './habitan.model';
import { TypeOfSample } from './type-of-sample.model';
export declare class HabitansType {
    readonly id: string;
    label: string;
    habitan: Habitan;
    type_of_samples: TypeOfSample[];
}
