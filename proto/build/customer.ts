/* eslint-disable */


export interface actId {
  id: string;
}

export interface Customer {
  fullname: string;
  label: string;
  address: Address | undefined;
  tel: string;
  email: string;
}

export interface Address {
  zip: string;
  country: string;
  region: string;
  city: string;
  street: string;
  building: string;
  room: string;
}

export interface CustomerService {

  GetCustomer(request: actId): Promise<Customer>;

}
