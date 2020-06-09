import { CustomerModel } from "src/app/shared/models/customer.model";
import { GCustomerModel } from "src/app/shared/models/gcustomer.model";
import { LabModel } from "src/app/shared/models/lab.model";
import { generalOptionModel } from "src/app/shared/models/generalOptions.model";
import { OptionGroupBaseModel } from 'src/app/shared/models/interface/option-group-base.model';

export class OptionsEditDataModel {
  public key: string;
  public label: string;
  public item: CustomerModel | GCustomerModel | LabModel | generalOptionModel | OptionGroupBaseModel;

  constructor(
    key: string,
    label: string,
    item?: CustomerModel | GCustomerModel | LabModel | generalOptionModel | OptionGroupBaseModel
  ) {
    this.item = item || undefined;
    this.label = label;
    this.key = key;
  }
}
