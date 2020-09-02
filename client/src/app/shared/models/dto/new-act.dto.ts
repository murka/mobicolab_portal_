import { ApplicationModel } from "../application.model";

export class NewActDto {
  public name: string;
  public customer: string;
  public generalCustomer: string;
  public lab: string;
  public typeOfSample: {
    habitan: string;
    htype: string;
  };
  public objectName?: string;
  public place?: string;
  public datetime?: {
    date?: Date;
    time?: string;
  };
  public method?: string;
  public toolType?: string;
  public climaticEnvironmental?: string;
  public planning?: string;
  public normativeDocument?: string[];
  public sampleType?: string;
  public sample?: string[];
  public preparation?: string[];
  public goal?: string;
  public definedIndicators?: string[];
  public additions?: string;
  public informationAboutSelection?: string;
  public environmentalEngineer?: string;
  public representative?: string;
  public passedSample?: string;
  public applications?: ApplicationModel[];

  constructor(options: {
    name: string;
    customer: string;
    generalCustomer: string;
    lab: string;
    typeOfSample: {
      habitan: string;
      htype: string;
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
    normativeDocument?: string[];
    sampleType?: string;
    sample?: string[];
    preparation?: string[];
    goal?: string;
    definedIndicators?: string[];
    additions?: string;
    informationAboutSelection?: string;
    environmentalEngineer?: string;
    representative?: string;
    passedSample?: string;
    applications?: ApplicationModel[];
  }) {
    this.name = options.name;
    this.customer = options.customer;
    this.generalCustomer = options.generalCustomer;
    this.lab = options.lab;
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
    this.sample = options.sample;
    this.preparation = options.preparation;
    this.goal = options.goal;
    this.definedIndicators = options.definedIndicators;
    this.additions = options.additions;
    this.informationAboutSelection = options.informationAboutSelection;
    this.environmentalEngineer = options.environmentalEngineer;
    this.representative = options.representative;
    this.passedSample = options.passedSample;
    this.applications =
      options.applications.length !== 0 ? options.applications : null;
  }
}
