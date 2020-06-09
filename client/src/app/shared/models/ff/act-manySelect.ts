import { ActBase } from './act-base';

export class ManySelectAct extends ActBase<string> {
    controlType = 'manySelect';
    options: string[];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}