export class TypeOfSample {
    public label: string;
    public types: string[];
    public _id: string;

    constructor(options: {label: string, types?: string[]}) {
        this.label = options.label;
        this.types = options.types;
    }
}