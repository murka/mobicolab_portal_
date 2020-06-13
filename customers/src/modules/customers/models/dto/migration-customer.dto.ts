import { Address } from "../address.model";

export class MigrationCustomerDto {
    id: string;
    fullname: string;
    label: string;
    address?: Address;
    tel?: string;
    email?: string;
}