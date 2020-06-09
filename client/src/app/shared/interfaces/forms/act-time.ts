import { ActBase } from '../../models/ff/act-base';

export class TimeAct extends ActBase<string> {
    controlType = 'time';

    constructor(options: {} = {}) {
        super(options);
    }
}