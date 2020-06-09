import { ActBase } from './act-base';

export class CheapAutocompleteAct extends ActBase<string> {
    controlType = 'cheapAutocomplete'

    constructor(options: {} = {}) {
        super(options);
    }
}