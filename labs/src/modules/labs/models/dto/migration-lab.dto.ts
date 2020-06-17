import { LabAddress } from "../lab-address.model";

export class MigrationLabDto {
    id: string;
    fullname: string;
    label: string;
    address?: LabAddress;
    tel?: string;
    email?: string;
}