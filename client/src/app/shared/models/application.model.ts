export class ApplicationModel {
  public id: string;
  public place: string;
  public datetime: {
    date: Date;
    time: string;
  };

  constructor(
    id: string,
    place: string,
    datetime: { date: Date; time: string }
  ) {
    this.id = id;
    this.place = place;
    this.datetime = datetime;
  }
}
