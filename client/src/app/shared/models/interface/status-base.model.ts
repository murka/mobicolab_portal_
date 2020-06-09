export class StatusBaseModel {
  constructor(public options: {
    key: string,
    label: string,
    filters: boolean
  }) {}
}
