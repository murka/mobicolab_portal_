import { Address } from "../address.model";

export class MigrationLabDto {
    id: string;
    fullname: string;
    label: string;
    address?: Address;
    tel?: string;
    email?: string;
}