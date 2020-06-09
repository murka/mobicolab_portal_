import { ActBase } from './act-base';

export class AutocompleteAct extends ActBase<string> {
    controlType = 'autocomplete'

    constructor(options: {} = {}) {
        super(options);
    }
}