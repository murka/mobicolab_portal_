import { CustomerModel } from "./customer.model";
import { GCustomerModel } from "./gcustomer.model";
import { StatusModel } from './status.model';
import { ApplicationModel } from './application.model';
import { LabModel } from './lab.model';

export class ActModel {
  public _id: string;
  public name: string;
  public customer: CustomerModel;
  public generalCustomer: GCustomerModel['_id'];
  public lab: LabModel;
  public typeOfSample: {
    habitan?: string;
    types?: string[];
  };
  public objectName: string;
  public place: string;
  public datetime: {
    date?: Date;
    time?: string;
  };
  public method: string;
  public toolType: string;
  public climaticEnvironmental: string;
  public planning: string;
  public normativeDocument: string;
  public sampleType: string;
  public volumeSample: string;
  public container: string;
  public preparation: string;
  public goal: string;
  public definedIndicators: string;
  public additions: string;
  public informationAboutSelection: string;
  public environmentalEngineer: string;
  public representative: string;
  public passedSample: string;
  public createdAt: string;
  public updatedAt: string;
  public files: Array< 
    {
      title?: string,
      name?: string,
      path?: string,
    }
  >;
  public status: string;
  public application: ApplicationModel[];

  constructor(options: {
    _id?: string;
    name?: string;
    customer?: CustomerModel;
    generalCustomer?: GCustomerModel['_id'];
    lab?: LabModel;
    typeOfSample?: {
      habitan?: string;
      types?: string[];
    };
    objectName?: string;
    place?: string;
    datetime?: {
      date?: Date;
      time?: string;
    };
    method?: string;
    toolType?: string;
    climaticEnvironmental?: string;
    planning?: string;
    normativeDocument?: string;
    sampleType?: string;
    volumeSample?: string;
    container?: string;
    preparation?: string;
    goal?: string;
    definedIndicators?: string;
    additions?: string;
    informationAboutSelection?: string;
    environmentalEngineer?: string;
    representative?: string;
    passedSample?: string;
    createdAt?: string;
    updatedAt?: string;
    files?: [
      {
        title?: string,
        name?: string,
        path?: string,
      }
    ];
    status?: string;
    application?: ApplicationModel[];
  }) {
    this._id = options._id;
    this.name = options.name;
    this.customer = options.customer;
    this.generalCustomer = options.generalCustomer;
    this.lab = options.lab
    this.typeOfSample = options.typeOfSample;
    this.objectName = options.objectName;
    this.place = options.place;
    this.datetime = options.datetime;
    this.method = options.method;
    this.toolType = options.toolType;
    this.climaticEnvironmental = options.climaticEnvironmental;
    this.planning = options.planning;
    this.normativeDocument = options.normativeDocument;
    this.sampleType = options.sampleType;
    this.volumeSample = options.volumeSample;
    this.container = options.container;
    this.preparation = options.preparation;
    this.goal = options.goal;
    this.definedIndicators = options.definedIndicators;
    this.additions = options.additions;
    this.informationAboutSelection = options.informationAboutSelection;
    this.environmentalEngineer = options.environmentalEngineer;
    this.representative = options.representative;
    this.passedSample = options.passedSample;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
    this.files = options.files;
    this.status = options.status;
    this.application = options.application;
  }
}
