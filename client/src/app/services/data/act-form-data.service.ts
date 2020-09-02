import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { OptionsBaseModel } from "src/app/shared/models/interface/options-base.model";
import { ActFormControlService } from "../controls/act-form-control.service";
import { EditActOptionsComponent } from "src/app/acts/act-form/edit-act-options/edit-act-options.component";
import { OptionsEditDataModel } from "src/app/acts/act-form/edit-act-options/data.model";
import { MatDialog } from "@angular/material/dialog";
import { FormGroup } from "@angular/forms";
import { filter, switchMap, map } from "rxjs/operators";
import { GCustomerModel } from "src/app/shared/models/gcustomer.model";
import { CustomerModel } from "src/app/shared/models/customer.model";
import { GeneralCustomerControlService } from "../controls/general-custromer-control.service";
import { CustomerControlService } from "../controls/customer-control.service";
import {
  OptionGroupBaseModel,
  ItemsGroupModel,
} from "src/app/shared/models/interface/option-group-base.model";
import { LabModel } from "src/app/shared/models/lab.model";
import { generalOptionModel } from "src/app/shared/models/generalOptions.model";
import { Habitan } from "src/app/shared/models/habitan.model";
import { UpdateHTypeMutation } from "src/types/generated";

@Injectable({
  providedIn: "root",
})
export class ActFormDataService {
  constructor(
    private AFCS: ActFormControlService,
    private dialog: MatDialog,
    private gcustomerControl: GeneralCustomerControlService,
    private customerControl: CustomerControlService
  ) {}

  getItemOptions(path: string): Observable<OptionsBaseModel[]> {
    const options: OptionsBaseModel[] = [];
    this.AFCS.getItems(path).subscribe((items) => {
      items.forEach((item) => {
        options.push(new OptionsBaseModel(item));
      });
    });
    return of(options);
  }

  getItemOptionsOfGroup(path: string): Observable<OptionGroupBaseModel[]> {
    let options = [];
    this.AFCS.getItems(path).subscribe((items) => {
      items.forEach((item) =>
        options.push(new OptionGroupBaseModel(<Habitan>item))
      );
    });
    return of(options);
  }

  addItemOptions(key: string, label: string): Observable<OptionsBaseModel> {
    const CustomerRef = this.dialog.open(EditActOptionsComponent, {
      data: new OptionsEditDataModel(key, label),
    });
    return CustomerRef.afterClosed().pipe(
      filter((result) => result !== undefined),
      switchMap((result) => {
        return this.AFCS.postActItem(key, result).pipe(
          map(
            (
              item:
                | CustomerModel
                | GCustomerModel
                | LabModel
                | generalOptionModel
            ) => {
              console.log(`after req ${JSON.stringify(item)}`);

              return new OptionsBaseModel(item);
            }
          )
        );
      })
    );
  }

  editItemOptions(
    key: string,
    label: string,
    id: string
  ): Observable<OptionsBaseModel> {
    return this.AFCS.getItem(key, id).pipe(
      switchMap((item) => {
        const CustomerRef = this.dialog.open(EditActOptionsComponent, {
          data: new OptionsEditDataModel(key, label, item),
        });
        return CustomerRef.afterClosed().pipe(
          filter((result: FormGroup | undefined) => result !== undefined),
          switchMap((result) => {
            return this.AFCS.patchtActItem(key, id, result).pipe(
              map((item) => {
                return new OptionsBaseModel(item);
              })
            );
          })
        );
      })
    );
  }

  deleteItemOptions(key: string, id: string): void {
    this.AFCS.deleteItem(key, id).subscribe();
  }

  addItemGroupOptions(
    key: string,
    label: string,
    id?: string,
    name?: string
  ): Observable<OptionGroupBaseModel | ItemsGroupModel> {
    if (id && name) {
      const CustomerRef = this.dialog.open(EditActOptionsComponent, {
        data: new OptionsEditDataModel(key, name),
      });
      return CustomerRef.afterClosed().pipe(
        filter((result) => result !== undefined),
        switchMap((result) => {
          return this.AFCS.postActItemArray(key, id, {
            value: result.label,
          }).pipe(
            map((item) => {
              return new ItemsGroupModel({
                ...item.createHabitansType,
                buttonController: false,
              });
            })
          );
        })
      );
    } else {
      const CustomerRef = this.dialog.open(EditActOptionsComponent, {
        data: new OptionsEditDataModel(key, label),
      });
      return CustomerRef.afterClosed().pipe(
        filter((result) => result !== undefined),
        switchMap((result) => {
          return this.AFCS.postActItem(key, result).pipe(
            map((item: Habitan) => {
              return new OptionGroupBaseModel(item);
            })
          );
        })
      );
    }
  }

  editItemGroupOtopns(
    key: string,
    label: string,
    id: string,
    item: OptionGroupBaseModel,
    tp?: ItemsGroupModel,
    name?: string
  ): Observable<OptionGroupBaseModel | ItemsGroupModel> {
    if (!name) {
      const CustomerRef = this.dialog.open(EditActOptionsComponent, {
        data: new OptionsEditDataModel(key, label, item),
      });
      return CustomerRef.afterClosed().pipe(
        filter((result) => result !== undefined),
        switchMap((result) => {
          return this.AFCS.patchtActItem(key, id, result.label).pipe(
            map((item: Habitan) => {
              console.log(item);
              return new OptionGroupBaseModel(item);
            })
          );
        })
      );
    } else {
      const CustomerRef = this.dialog.open(EditActOptionsComponent, {
        data: new OptionsEditDataModel(
          key,
          name,
          new generalOptionModel({ label: tp.label })
        ),
      });
      return CustomerRef.afterClosed().pipe(
        filter((result) => result !== undefined),
        switchMap((result) => {
          return this.AFCS.patchtActItem("htype", tp.id, result.label).pipe(
            map((item: UpdateHTypeMutation["updateHabitansType"]) => {
              return new ItemsGroupModel({ ...item, buttonController: false });
            })
          );
        })
      );
    }
  }

  deleteItemGroupOption(
    key: string,
    id: string,
    item: OptionGroupBaseModel,
    tp: string
  ): Observable<OptionGroupBaseModel> {
    const newTypes: { id: string; label: string }[] = item.htypes.filter(
      (type) => type.id !== tp
    );
    return this.AFCS.patchtActItem(
      key,
      id,
      new Habitan({ label: item.label, htypes: newTypes })
    ).pipe(
      map((item: Habitan) => {
        return new OptionGroupBaseModel(item);
      })
    );
  }

  getActiveGCustomer(): Observable<GCustomerModel[]> {
    return this.gcustomerControl.getGCustomers().pipe(
      map((customers) =>
        customers.filter((customer) => {
          if (customer.acts.length > 0) return customer;
        })
      )
    );
  }

  getActiveCustomer() {
    return this.customerControl.getCustomers().pipe(
      map((customers) => {
        console.log(customers.getCustomers);

        return {
          ...customers,
          getCustomers: customers.getCustomers.filter(
            (customer) => customer.acts.length !== 0
          ),
        };
      })
    );
  }
}
