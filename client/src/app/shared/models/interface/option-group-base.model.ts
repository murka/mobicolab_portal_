import { TypeOfSample } from '../type-sample.model';

export class OptionGroupBaseModel {
    public label: string;
    public types: string[];
    public key: string;

    constructor(options: TypeOfSample) {
        this.label = options.label;
        this.types = options.types;
        this.key = options._id
    }
}