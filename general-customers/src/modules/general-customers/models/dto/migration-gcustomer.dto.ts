import { GCAddress } from "../gc-address.model";

export class MigrationGCustomerDto {
    id: string;
    fullname: string;
    label: string;
    address?: GCAddress;
    tel?: string;
    email?: string;
}