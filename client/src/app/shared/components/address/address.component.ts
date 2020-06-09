import { Component, OnInit, Input, NgZone } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import { AddressModel } from "../../models/address.model";
import { AddressFieldsService } from "./address-fields.service";

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"]
})
export class AddressComponent implements OnInit {
  @Input() item: AddressModel;
  @Input() form: FormGroup;
  @Input() key: string;
  control: FormGroup;
  address: Object;
  formattedAddress: string;
  fields: Array<any>;

  constructor(
    private fb: FormBuilder,
    private afs: AddressFieldsService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.fields = this.afs.getFields();
    this.control = this.initForm(this.afs.getFields(), this.item);
    this.form.setControl(this.key, this.control);
  }

  initForm(fields: any[], item?: AddressModel): FormGroup {
    let group = {};

    fields.forEach(field => {
      if (item && !field.nestedGroup) {
        field.value = item[field.key];
      }
      group[field.key] = field.required
        ? [field.value || "", Validators.required]
        : [field.value || ""];
    });
    return this.fb.group(group);
  }

  getAddress(place: object) {
    this.address = place["formatted_address"];
    // this.phone = this.getPhone(place);
    this.formattedAddress = place["formatted_address"];
    this.zone.run(() => {
      this.formattedAddress = place["formatted_address"];
      let options = {
        zip: this.getPostCode(place) || "",
        country: this.getCountry(place) || "",
        region: this.getState(place) || "",
        city: this.getCity(place) || "",
        street: this.getStreet(place) || "",
        building: this.getStreetNumber(place) || ""
      };
      this.form.get(this.key).patchValue(new AddressModel(options));
    });
  }

  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: "short_name" },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: "long_name" },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: "long_name" },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: "short_name" },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: "short_name" },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountryShort(place) {
    const COMPONENT_TEMPLATE = { country: "short_name" },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: "long_name" },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: "long_name" },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = {
        formatted_phone_number: "formatted_phone_number"
      },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }
}
