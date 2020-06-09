export class ApplicationModel {
    public place: string;
    public datetime: {
        date: Date;
        time: string;
    }

    constructor(place: string, datetime: {date: Date; time: string}) {
        this.place = place;
        this.datetime = datetime;
    }
}