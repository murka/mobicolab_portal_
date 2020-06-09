import { ActBase } from './act-base';

export class DateAct extends ActBase<string> {
    controlType = 'date';
    date = true;

    constructor(options: {} = {}) {
        super(options);
    }
}