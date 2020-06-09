import { ActBase } from './act-base';

export class TextFieldAct extends ActBase<string> {
    controlType = 'textField'

    constructor(options: {} = {}) {
        super(options);
    }
}