import { ActBase } from './act-base';

export class SelectLab extends ActBase<string> {
    controlType = 'SelectLab';
    options: string[];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}