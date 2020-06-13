import { Address } from "../address.model";

export class MigrationGCustomerDto {
    id: string;
    fullname: string;
    label: string;
    address?: Address;
    tel?: string;
    email?: string;
}