import { ActBase } from './act-base';

export class InputAct extends ActBase<string> {
    controlType = 'input'

    constructor(options: {} = {}) {
        super(options);
    }
}