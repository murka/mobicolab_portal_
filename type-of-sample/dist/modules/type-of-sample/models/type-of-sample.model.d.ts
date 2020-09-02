import { HabitansType } from './habitans-type.model';
import { Habitan } from './habitan.model';
import { Act } from './act.model';
export declare class TypeOfSample {
    readonly id: string;
    habitan: Habitan;
    htype: HabitansType;
    acts: Act[];
}
