export class StatusModel {
  public production: boolean;
  public registration: boolean;
  public protocolCreated: boolean;
  public remarks: boolean;
  public noRemarks: boolean;
  public protocolUploaded: boolean;

  constructor(
    production?: boolean,
    registration?: boolean,
    protocolCreated?: boolean,
    remarks?: boolean,
    noRemarks?: boolean,
    protocolUploaded?: boolean
  ) {
    
  }
}
