import { AddressModel } from './address.model';
import { ActModel } from './act.model';

export class CustomerModel {
    public _id: string;
    public fullname: string;
    public label: string;
    public tel: string;
    public email: string;
    public address: AddressModel;
    public acts: ActModel['_id'][];

    constructor(options: {fullname: string, label: string, tel?: string, email?: string, address?: AddressModel }) {
        this.fullname = options.fullname;
        this.label = options.label;
        this.tel = options.tel;
        this.email = options.email;
        this.address = options.address;
    }
}