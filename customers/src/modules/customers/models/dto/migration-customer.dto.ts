import { CustomerAddress } from "../customer-address.model";

export class MigrationCustomerDto {
    id: string;
    fullname: string;
    label: string;
    address?: CustomerAddress;
    tel?: string;
    email?: string;
}