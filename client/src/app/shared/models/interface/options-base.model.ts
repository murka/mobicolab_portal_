import { CustomerModel } from '../customer.model';
import { GCustomerModel } from '../gcustomer.model';
import { LabModel } from '../lab.model';
import { generalOptionModel } from '../generalOptions.model';

export class OptionsBaseModel {
    value: string;
    key: string;
    buttonController: boolean = false;

    constructor(options: CustomerModel | GCustomerModel | LabModel | generalOptionModel) {
        this.value = options.label
        this.key = options._id
    }
}