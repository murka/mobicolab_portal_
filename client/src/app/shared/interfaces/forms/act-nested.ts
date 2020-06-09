import { ActBase } from '../../models/ff/act-base';

export class NestedAct extends ActBase<string> {
    nestedGroup = true;
    options: string[];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}