import { ActBase } from './act-base';

export class GroupSelectAct extends ActBase<string> {
    controlType = 'groupSelect';
    options: string[];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}