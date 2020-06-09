export class AddressModel {
    zip: string;
    country: string;
    region: string;
    city: string;
    street: string;
    building: string;
    room: string;

    constructor(options: {zip?: string, country?: string, region?: string, city?: string, street?: string, building?: string, room?: string}) {
        this.zip = options.zip;
        this.country = options.country;
        this.region = options.region;
        this.city = options.city;
        this.street = options.street;
        this.room = options.room;
    }
}