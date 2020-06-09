import { AddressModel } from './address.model';

export class generalOptionModel {
    public _id: string;
    public label: string;
    public address?: AddressModel;

    constructor(options: {label: string}) {
        this.label = options.label;
    }
}