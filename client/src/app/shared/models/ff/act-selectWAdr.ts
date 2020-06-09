import { ActBase } from './act-base';

export class SelectWAdrAct extends ActBase<string> {
    controlType = 'SelectWAdr';
    options: string[];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}