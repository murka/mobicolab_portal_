import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  _FieldSet: any;
};








export type Act = {
  __typename?: 'Act';
  id: Scalars['ID'];
  name: Scalars['String'];
  customer: Customer;
  generalCustomer: GeneralCustomer;
  lab: Lab;
  docs?: Maybe<Array<Doc>>;
  typeOfSample: TypeOfSample;
  objectName: Scalars['String'];
  place: Scalars['String'];
  datetime: DateAndTime;
  method: Scalars['String'];
  toolType: Scalars['String'];
  climaticEnvironmental: Scalars['String'];
  planning: Scalars['String'];
  normativeDocument: Array<Scalars['String']>;
  sampleType: Scalars['String'];
  sample: Array<Scalars['String']>;
  preparation: Array<Scalars['String']>;
  goal: Scalars['String'];
  definedIndicators: Array<Scalars['String']>;
  additions: Scalars['String'];
  informationAboutSelection: Scalars['String'];
  environmentalEngineer: Scalars['String'];
  representative: Scalars['String'];
  passedSample: Scalars['String'];
  applications: Array<Application>;
  status: Scalars['String'];
  general_customer: GeneralCustomer;
};

export type Application = {
  __typename?: 'Application';
  id: Scalars['ID'];
  place: Scalars['String'];
  datetime: DateAndTime;
};

export type ApplicationInput = {
  id: Scalars['ID'];
  place: Scalars['String'];
  datetime: DateTimeInput;
};

export type CopyAppDto = {
  place: Scalars['String'];
  datetime: DateTimeInput;
};

export type CreateCustomerDto = {
  fullname: Scalars['String'];
  label: Scalars['String'];
  address?: Maybe<CustomerAddressInput>;
  tel?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type CreateGeneralCustomerDto = {
  fullname: Scalars['String'];
  label: Scalars['String'];
  address?: Maybe<GcAdressInput>;
  tel?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type CreateHTypeDto = {
  habitanId: Scalars['ID'];
  label: Scalars['String'];
};

export type CreateLabDto = {
  fullname: Scalars['String'];
  label: Scalars['String'];
  address?: Maybe<LabAddressInput>;
  tel?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['ID'];
  fullname: Scalars['String'];
  label: Scalars['String'];
  address: CustomerAddress;
  tel?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  acts: Array<Act>;
};

export type CustomerAddress = {
  __typename?: 'CustomerAddress';
  zip?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  room?: Maybe<Scalars['String']>;
};

export type CustomerAddressInput = {
  zip?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  room?: Maybe<Scalars['String']>;
};

export type DateAndTime = {
  __typename?: 'DateAndTime';
  date: Scalars['DateTime'];
  time: Scalars['String'];
};


export type DateTimeInput = {
  date: Scalars['DateTime'];
  time: Scalars['String'];
};

export type Doc = {
  __typename?: 'Doc';
  id: Scalars['ID'];
  title: Scalars['String'];
  ydUrl: Scalars['String'];
  name: Scalars['String'];
  downloadable: Scalars['Boolean'];
};

export type GcAddress = {
  __typename?: 'GCAddress';
  zip: Scalars['String'];
  country: Scalars['String'];
  region: Scalars['String'];
  city: Scalars['String'];
  street: Scalars['String'];
  building: Scalars['String'];
  room: Scalars['String'];
};

export type GcAdressInput = {
  zip: Scalars['String'];
  country: Scalars['String'];
  region: Scalars['String'];
  city: Scalars['String'];
  street: Scalars['String'];
  building: Scalars['String'];
  room: Scalars['String'];
};

export type GeneralCustomer = {
  __typename?: 'GeneralCustomer';
  id: Scalars['ID'];
  fullname: Scalars['String'];
  label: Scalars['String'];
  address: GcAddress;
  tel?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  evnets: Scalars['String'];
  acts: Array<Act>;
};

export type Habitan = {
  __typename?: 'Habitan';
  id: Scalars['ID'];
  label: Scalars['String'];
  htypes?: Maybe<Array<Maybe<HType>>>;
  type_of_samples: Array<TypeOfSample>;
  acts: Array<Act>;
};

export type HType = {
  __typename?: 'HType';
  id: Scalars['ID'];
  label: Scalars['String'];
  habitan: Habitan;
  type_of_samples: Array<TypeOfSample>;
  acts: Array<Act>;
};

export type InsertGeneralCustomerDto = {
  id: Scalars['String'];
  fullname?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  address?: Maybe<GcAdressInput>;
  tel?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type InsertLabDto = {
  id: Scalars['String'];
  fullname?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  address?: Maybe<LabAddressInput>;
  tel?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Lab = {
  __typename?: 'Lab';
  id: Scalars['ID'];
  fullname: Scalars['String'];
  label: Scalars['String'];
  address: LabAddress;
  tel?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  events: Array<LabEvent>;
  acts: Array<Act>;
};

export type LabAddress = {
  __typename?: 'LabAddress';
  zip?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  room?: Maybe<Scalars['String']>;
};

export type LabAddressInput = {
  zip?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  room?: Maybe<Scalars['String']>;
};

export type LabEvent = {
  __typename?: 'LabEvent';
  id: Scalars['ID'];
};

export type LabTypeOfSampleTemplateModel = {
  __typename?: 'LabTypeOfSampleTemplateModel';
  labId: Scalars['String'];
  typeOfSampleId: Scalars['String'];
  path?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPdf?: Maybe<PdfTemplater>;
  createLabTypeOfSampleTemplate: LabTypeOfSampleTemplateModel;
  updateLabTypeOfSampleTemplate: LabTypeOfSampleTemplateModel;
  createHabitansType: HType;
  updateHabitansType: HType;
  createHabitan: Habitan;
  updateHabitan: Habitan;
  createHabitnsTypeParent: HType;
  createAct: Act;
  updateAct: Act;
  createApplication: Application;
  createAppCopy: Application;
  deleteApplication: Application;
  createLab: Lab;
  updateLab: Lab;
  createGeneralCustomer: GeneralCustomer;
  updateGeneralCustomer: GeneralCustomer;
  droppDoc: Doc;
  titlingDoc: Doc;
  removeDoc?: Maybe<Doc>;
  createCustomer: Customer;
  updateCustomer: Customer;
};


export type MutationCreatePdfArgs = {
  path: Scalars['String'];
  actId: Scalars['String'];
};


export type MutationCreateLabTypeOfSampleTemplateArgs = {
  newLabTypeOfSampleTemplateData: NewLabTypeOfSampleTemplate;
};


export type MutationUpdateLabTypeOfSampleTemplateArgs = {
  patchLabTypeOfSampleTemplateData: NewLabTypeOfSampleTemplate;
};


export type MutationCreateHabitansTypeArgs = {
  createHTypeData: CreateHTypeDto;
};


export type MutationUpdateHabitansTypeArgs = {
  label: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateHabitanArgs = {
  label: Scalars['String'];
};


export type MutationUpdateHabitanArgs = {
  label: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateHabitnsTypeParentArgs = {
  label: Scalars['String'];
};


export type MutationCreateActArgs = {
  newActData: NewActDto;
};


export type MutationUpdateActArgs = {
  updateActData: PatchActDto;
};


export type MutationCreateAppCopyArgs = {
  copyAppData: CopyAppDto;
};


export type MutationDeleteApplicationArgs = {
  id: Scalars['String'];
};


export type MutationCreateLabArgs = {
  createLabData: CreateLabDto;
};


export type MutationUpdateLabArgs = {
  insertLabData: InsertLabDto;
};


export type MutationCreateGeneralCustomerArgs = {
  createGeneralCustomerData: CreateGeneralCustomerDto;
};


export type MutationUpdateGeneralCustomerArgs = {
  insertGeneralCustomerData: InsertGeneralCustomerDto;
};


export type MutationDroppDocArgs = {
  mimetype: Scalars['String'];
  name: Scalars['String'];
  actId: Scalars['String'];
};


export type MutationTitlingDocArgs = {
  titlingDocData: TitlingDocInput;
};


export type MutationRemoveDocArgs = {
  docId: Scalars['String'];
};


export type MutationCreateCustomerArgs = {
  createCustomerData: CreateCustomerDto;
};


export type MutationUpdateCustomerArgs = {
  updateCustomerData: PatchCustomerDto;
};

export type NewActDto = {
  name: Scalars['String'];
  customer: Scalars['String'];
  generalCustomer: Scalars['String'];
  lab: Scalars['String'];
  typeOfSample: TypeOfSampleInput;
  objectName: Scalars['String'];
  place: Scalars['String'];
  datetime: DateTimeInput;
  method: Scalars['String'];
  toolType: Scalars['String'];
  climaticEnvironmental: Scalars['String'];
  planning: Scalars['String'];
  normativeDocument: Array<Scalars['String']>;
  sampleType: Scalars['String'];
  sample: Array<Scalars['String']>;
  preparation: Array<Scalars['String']>;
  goal: Scalars['String'];
  definedIndicators: Array<Scalars['String']>;
  additions: Scalars['String'];
  informationAboutSelection: Scalars['String'];
  environmentalEngineer: Scalars['String'];
  representative: Scalars['String'];
  passedSample: Scalars['String'];
  applications?: Maybe<Array<ApplicationInput>>;
};

export type NewLabTypeOfSampleTemplate = {
  labId: Scalars['String'];
  typeId: Scalars['String'];
  path: Scalars['String'];
};

export type PatchActDto = {
  id: Scalars['String'];
  name: Scalars['String'];
  customer: Scalars['String'];
  generalCustomer: Scalars['String'];
  lab: Scalars['String'];
  typeOfSample: TypeOfSampleInput;
  objectName: Scalars['String'];
  place: Scalars['String'];
  datetime: DateTimeInput;
  method: Scalars['String'];
  toolType: Scalars['String'];
  climaticEnvironmental: Scalars['String'];
  planning: Scalars['String'];
  normativeDocument: Array<Scalars['String']>;
  sampleType: Scalars['String'];
  sample: Array<Scalars['String']>;
  preparation: Array<Scalars['String']>;
  goal: Scalars['String'];
  definedIndicators: Array<Scalars['String']>;
  additions: Scalars['String'];
  informationAboutSelection: Scalars['String'];
  environmentalEngineer: Scalars['String'];
  representative: Scalars['String'];
  passedSample: Scalars['String'];
  applications?: Maybe<Array<ApplicationInput>>;
};

export type PatchCustomerDto = {
  id: Scalars['String'];
  fullname?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  address?: Maybe<CustomerAddressInput>;
  tel?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type PdfTemplater = {
  __typename?: 'PdfTemplater';
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getLabTypeOfSampleTemplate?: Maybe<LabTypeOfSampleTemplateModel>;
  getAllHabitansTypes: Array<HType>;
  getAllHabitans: Array<Habitan>;
  getActs?: Maybe<Array<Maybe<Act>>>;
  getAct: Act;
  getAllApplication: Array<Application>;
  getLabs: Array<Lab>;
  getLab: Lab;
  transformLabs: Lab;
  getGeneralCustomers: Array<GeneralCustomer>;
  getGeneralCustomer: GeneralCustomer;
  transformGCustomers: GeneralCustomer;
  docs: Array<Doc>;
  getCustomers: Array<Customer>;
  customer: Customer;
};


export type QueryGetLabTypeOfSampleTemplateArgs = {
  typeId: Scalars['String'];
  labId: Scalars['String'];
};


export type QueryGetActArgs = {
  id: Scalars['String'];
};


export type QueryGetLabArgs = {
  id: Scalars['String'];
};


export type QueryGetGeneralCustomerArgs = {
  id: Scalars['String'];
};


export type QueryDocsArgs = {
  actId: Scalars['String'];
};


export type QueryCustomerArgs = {
  id: Scalars['String'];
};

export type TitlingDocInput = {
  actId: Scalars['String'];
  docId: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
  mimtype: Scalars['String'];
};

export type TypeOfSample = {
  __typename?: 'TypeOfSample';
  habitan: Habitan;
  htype: HType;
};

export type TypeOfSampleInput = {
  habitan: Scalars['String'];
  htype: Scalars['String'];
};

export type WholeActFragment = (
  { __typename?: 'Act' }
  & Pick<Act, 'id' | 'name' | 'objectName' | 'place' | 'method' | 'toolType' | 'climaticEnvironmental' | 'planning' | 'normativeDocument' | 'sampleType' | 'sample' | 'preparation' | 'goal' | 'definedIndicators' | 'additions' | 'informationAboutSelection' | 'environmentalEngineer' | 'representative' | 'passedSample' | 'status'>
  & { customer: (
    { __typename?: 'Customer' }
    & Pick<Customer, 'id'>
  ), generalCustomer: (
    { __typename?: 'GeneralCustomer' }
    & Pick<GeneralCustomer, 'id'>
  ), lab: (
    { __typename?: 'Lab' }
    & Pick<Lab, 'id'>
  ), typeOfSample: (
    { __typename?: 'TypeOfSample' }
    & { habitan: (
      { __typename?: 'Habitan' }
      & Pick<Habitan, 'id'>
    ), htype: (
      { __typename?: 'HType' }
      & Pick<HType, 'id'>
    ) }
  ), datetime: (
    { __typename?: 'DateAndTime' }
    & Pick<DateAndTime, 'date' | 'time'>
  ), applications: Array<(
    { __typename?: 'Application' }
    & Pick<Application, 'id' | 'place'>
    & { datetime: (
      { __typename?: 'DateAndTime' }
      & Pick<DateAndTime, 'date' | 'time'>
    ) }
  )> }
);

export type WholeApplicationFragment = (
  { __typename?: 'Application' }
  & Pick<Application, 'id' | 'place'>
  & { datetime: (
    { __typename?: 'DateAndTime' }
    & Pick<DateAndTime, 'date' | 'time'>
  ) }
);

export type WholeCustomerFragment = (
  { __typename?: 'Customer' }
  & Pick<Customer, 'id' | 'fullname' | 'label' | 'tel' | 'email'>
  & { address: (
    { __typename?: 'CustomerAddress' }
    & Pick<CustomerAddress, 'zip' | 'country' | 'region' | 'city' | 'street' | 'building' | 'room'>
  ) }
);

export type WholeGeneralCustomerFragment = (
  { __typename?: 'GeneralCustomer' }
  & Pick<GeneralCustomer, 'id' | 'fullname' | 'label' | 'tel' | 'email'>
  & { address: (
    { __typename?: 'GCAddress' }
    & Pick<GcAddress, 'zip' | 'country' | 'region' | 'city' | 'street' | 'building' | 'room'>
  ) }
);

export type WholeLabFragment = (
  { __typename?: 'Lab' }
  & Pick<Lab, 'id' | 'fullname' | 'label' | 'tel' | 'email'>
  & { address: (
    { __typename?: 'LabAddress' }
    & Pick<LabAddress, 'zip' | 'country' | 'region' | 'city' | 'street' | 'building' | 'room'>
  ) }
);

export type ReqForOptionsFragment = (
  { __typename?: 'Lab' }
  & Pick<Lab, 'id' | 'label'>
);

export type PostActMutationVariables = Exact<{
  data: NewActDto;
}>;


export type PostActMutation = (
  { __typename?: 'Mutation' }
  & { createAct: (
    { __typename?: 'Act' }
    & Pick<Act, 'id' | 'name'>
  ) }
);

export type PatchActMutationVariables = Exact<{
  data: PatchActDto;
}>;


export type PatchActMutation = (
  { __typename?: 'Mutation' }
  & { updateAct: (
    { __typename?: 'Act' }
    & Pick<Act, 'id' | 'name'>
  ) }
);

export type CreatAppMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatAppMutation = (
  { __typename?: 'Mutation' }
  & { createApplication: (
    { __typename?: 'Application' }
    & Pick<Application, 'id'>
  ) }
);

export type CreateAppCopyMutationVariables = Exact<{
  data: CopyAppDto;
}>;


export type CreateAppCopyMutation = (
  { __typename?: 'Mutation' }
  & { createAppCopy: (
    { __typename?: 'Application' }
    & WholeApplicationFragment
  ) }
);

export type DeleteAppMutationVariables = Exact<{
  data: Scalars['String'];
}>;


export type DeleteAppMutation = (
  { __typename?: 'Mutation' }
  & { deleteApplication: (
    { __typename?: 'Application' }
    & Pick<Application, 'id'>
  ) }
);

export type CreateCustomerThroughOptionMutationVariables = Exact<{
  data: CreateCustomerDto;
}>;


export type CreateCustomerThroughOptionMutation = (
  { __typename?: 'Mutation' }
  & { createCustomer: (
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'label'>
  ) }
);

export type PatchCustomerThroughOptionMutationVariables = Exact<{
  data: PatchCustomerDto;
}>;


export type PatchCustomerThroughOptionMutation = (
  { __typename?: 'Mutation' }
  & { updateCustomer: (
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'label'>
  ) }
);

export type DroppDocMutationVariables = Exact<{
  actId: Scalars['String'];
  name: Scalars['String'];
  mimetype: Scalars['String'];
}>;


export type DroppDocMutation = (
  { __typename?: 'Mutation' }
  & { droppDoc: (
    { __typename?: 'Doc' }
    & Pick<Doc, 'id'>
  ) }
);

export type TitlingDocMutationVariables = Exact<{
  data: TitlingDocInput;
}>;


export type TitlingDocMutation = (
  { __typename?: 'Mutation' }
  & { titlingDoc: (
    { __typename?: 'Doc' }
    & Pick<Doc, 'title'>
  ) }
);

export type RemoveDocMutationVariables = Exact<{
  docId: Scalars['String'];
}>;


export type RemoveDocMutation = (
  { __typename?: 'Mutation' }
  & { removeDoc?: Maybe<(
    { __typename?: 'Doc' }
    & Pick<Doc, 'id'>
  )> }
);

export type CreateGeneralCustomerThroughOptionMutationVariables = Exact<{
  data: CreateGeneralCustomerDto;
}>;


export type CreateGeneralCustomerThroughOptionMutation = (
  { __typename?: 'Mutation' }
  & { createGeneralCustomer: (
    { __typename?: 'GeneralCustomer' }
    & Pick<GeneralCustomer, 'id' | 'label'>
  ) }
);

export type PatchGeneralCustomerThroughOptionMutationVariables = Exact<{
  data: InsertGeneralCustomerDto;
}>;


export type PatchGeneralCustomerThroughOptionMutation = (
  { __typename?: 'Mutation' }
  & { updateGeneralCustomer: (
    { __typename?: 'GeneralCustomer' }
    & Pick<GeneralCustomer, 'id' | 'label'>
  ) }
);

export type CreateLabThroughOptionMutationVariables = Exact<{
  data: CreateLabDto;
}>;


export type CreateLabThroughOptionMutation = (
  { __typename?: 'Mutation' }
  & { createLab: (
    { __typename?: 'Lab' }
    & ReqForOptionsFragment
  ) }
);

export type PatchLabThroughOptionMutationVariables = Exact<{
  data: InsertLabDto;
}>;


export type PatchLabThroughOptionMutation = (
  { __typename?: 'Mutation' }
  & { updateLab: (
    { __typename?: 'Lab' }
    & ReqForOptionsFragment
  ) }
);

export type CreateLabTosRuleMutationVariables = Exact<{
  data: NewLabTypeOfSampleTemplate;
}>;


export type CreateLabTosRuleMutation = (
  { __typename?: 'Mutation' }
  & { createLabTypeOfSampleTemplate: (
    { __typename?: 'LabTypeOfSampleTemplateModel' }
    & Pick<LabTypeOfSampleTemplateModel, 'path'>
  ) }
);

export type UpdateLabTosRuleMutationVariables = Exact<{
  data: NewLabTypeOfSampleTemplate;
}>;


export type UpdateLabTosRuleMutation = (
  { __typename?: 'Mutation' }
  & { updateLabTypeOfSampleTemplate: (
    { __typename?: 'LabTypeOfSampleTemplateModel' }
    & Pick<LabTypeOfSampleTemplateModel, 'path'>
  ) }
);

export type CreatePdfMutationVariables = Exact<{
  actId: Scalars['String'];
  path: Scalars['String'];
}>;


export type CreatePdfMutation = (
  { __typename?: 'Mutation' }
  & { createPdf?: Maybe<(
    { __typename?: 'PdfTemplater' }
    & Pick<PdfTemplater, 'id'>
  )> }
);

export type CreateHabitanMutationVariables = Exact<{
  data: Scalars['String'];
}>;


export type CreateHabitanMutation = (
  { __typename?: 'Mutation' }
  & { createHabitan: (
    { __typename?: 'Habitan' }
    & Pick<Habitan, 'id' | 'label'>
  ) }
);

export type CreateHTypeMutationVariables = Exact<{
  data: CreateHTypeDto;
}>;


export type CreateHTypeMutation = (
  { __typename?: 'Mutation' }
  & { createHabitansType: (
    { __typename?: 'HType' }
    & Pick<HType, 'id' | 'label'>
  ) }
);

export type UpdateHabitanMutationVariables = Exact<{
  id: Scalars['String'];
  label: Scalars['String'];
}>;


export type UpdateHabitanMutation = (
  { __typename?: 'Mutation' }
  & { updateHabitan: (
    { __typename?: 'Habitan' }
    & Pick<Habitan, 'id' | 'label'>
    & { htypes?: Maybe<Array<Maybe<(
      { __typename?: 'HType' }
      & Pick<HType, 'id' | 'label'>
    )>>> }
  ) }
);

export type UpdateHTypeMutationVariables = Exact<{
  id: Scalars['String'];
  label: Scalars['String'];
}>;


export type UpdateHTypeMutation = (
  { __typename?: 'Mutation' }
  & { updateHabitansType: (
    { __typename?: 'HType' }
    & Pick<HType, 'id' | 'label'>
  ) }
);

export type GetAllActsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllActsQuery = (
  { __typename?: 'Query' }
  & { getActs?: Maybe<Array<Maybe<(
    { __typename?: 'Act' }
    & Pick<Act, 'id' | 'name'>
    & { customer: (
      { __typename?: 'Customer' }
      & Pick<Customer, 'id' | 'label'>
    ), generalCustomer: (
      { __typename?: 'GeneralCustomer' }
      & Pick<GeneralCustomer, 'id' | 'label'>
    ), lab: (
      { __typename?: 'Lab' }
      & Pick<Lab, 'id' | 'label'>
    ), datetime: (
      { __typename?: 'DateAndTime' }
      & Pick<DateAndTime, 'date' | 'time'>
    ), docs?: Maybe<Array<(
      { __typename?: 'Doc' }
      & Pick<Doc, 'id' | 'title' | 'ydUrl' | 'name'>
    )>> }
  )>>> }
);

export type GetWholeActQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetWholeActQuery = (
  { __typename?: 'Query' }
  & { getAct: (
    { __typename?: 'Act' }
    & WholeActFragment
  ) }
);

export type GetCustomersForOptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomersForOptionQuery = (
  { __typename?: 'Query' }
  & { getCustomers: Array<(
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'label'>
  )> }
);

export type GetWholeCustomerQueryVariables = Exact<{
  data: Scalars['String'];
}>;


export type GetWholeCustomerQuery = (
  { __typename?: 'Query' }
  & { customer: (
    { __typename?: 'Customer' }
    & WholeCustomerFragment
  ) }
);

export type GetCustomersWithActsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomersWithActsQuery = (
  { __typename?: 'Query' }
  & { getCustomers: Array<(
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'label'>
    & { acts: Array<(
      { __typename?: 'Act' }
      & Pick<Act, 'id' | 'name'>
      & { datetime: (
        { __typename?: 'DateAndTime' }
        & Pick<DateAndTime, 'date'>
      ), lab: (
        { __typename?: 'Lab' }
        & Pick<Lab, 'id' | 'label'>
      ) }
    )> }
  )> }
);

export type GetGeneralCustomersForOptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGeneralCustomersForOptionQuery = (
  { __typename?: 'Query' }
  & { getGeneralCustomers: Array<(
    { __typename?: 'GeneralCustomer' }
    & Pick<GeneralCustomer, 'id' | 'label'>
  )> }
);

export type GetGeneralCustomerQueryVariables = Exact<{
  data: Scalars['String'];
}>;


export type GetGeneralCustomerQuery = (
  { __typename?: 'Query' }
  & { getGeneralCustomer: (
    { __typename?: 'GeneralCustomer' }
    & WholeGeneralCustomerFragment
  ) }
);

export type GetLabsForOptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLabsForOptionQuery = (
  { __typename?: 'Query' }
  & { getLabs: Array<(
    { __typename?: 'Lab' }
    & Pick<Lab, 'id' | 'label'>
  )> }
);

export type GetLabQueryVariables = Exact<{
  data: Scalars['String'];
}>;


export type GetLabQuery = (
  { __typename?: 'Query' }
  & { getLab: (
    { __typename?: 'Lab' }
    & WholeLabFragment
  ) }
);

export type GetActForItemQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActForItemQuery = (
  { __typename?: 'Query' }
  & { getActs?: Maybe<Array<Maybe<(
    { __typename?: 'Act' }
    & Pick<Act, 'id' | 'name' | 'status'>
    & { lab: (
      { __typename?: 'Lab' }
      & Pick<Lab, 'label'>
    ) }
  )>>> }
);

export type GetActIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActIdsQuery = (
  { __typename?: 'Query' }
  & { getActs?: Maybe<Array<Maybe<(
    { __typename?: 'Act' }
    & Pick<Act, 'id'>
  )>>> }
);

export type GetActForDetailsQueryVariables = Exact<{
  actId: Scalars['String'];
}>;


export type GetActForDetailsQuery = (
  { __typename?: 'Query' }
  & { getAct: (
    { __typename?: 'Act' }
    & Pick<Act, 'id' | 'name'>
    & { typeOfSample: (
      { __typename?: 'TypeOfSample' }
      & { habitan: (
        { __typename?: 'Habitan' }
        & Pick<Habitan, 'id'>
      ) }
    ), lab: (
      { __typename?: 'Lab' }
      & Pick<Lab, 'id'>
    ) }
  ) }
);

export type GetGeneratePathQueryVariables = Exact<{
  labId: Scalars['String'];
  typeId: Scalars['String'];
}>;


export type GetGeneratePathQuery = (
  { __typename?: 'Query' }
  & { getLabTypeOfSampleTemplate?: Maybe<(
    { __typename?: 'LabTypeOfSampleTemplateModel' }
    & Pick<LabTypeOfSampleTemplateModel, 'path'>
  )> }
);

export type GetHabitansOptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHabitansOptionQuery = (
  { __typename?: 'Query' }
  & { getAllHabitans: Array<(
    { __typename?: 'Habitan' }
    & Pick<Habitan, 'id' | 'label'>
    & { htypes?: Maybe<Array<Maybe<(
      { __typename?: 'HType' }
      & Pick<HType, 'id' | 'label'>
    )>>> }
  )> }
);

export const WholeActFragmentDoc = gql`
    fragment WholeAct on Act {
  id
  name
  customer {
    id
  }
  generalCustomer {
    id
  }
  lab {
    id
  }
  typeOfSample {
    habitan {
      id
    }
    htype {
      id
    }
  }
  objectName
  place
  datetime {
    date
    time
  }
  method
  toolType
  climaticEnvironmental
  planning
  normativeDocument
  sampleType
  sample
  preparation
  goal
  definedIndicators
  additions
  informationAboutSelection
  environmentalEngineer
  representative
  passedSample
  status
  applications {
    id
    place
    datetime {
      date
      time
    }
  }
}
    `;
export const WholeApplicationFragmentDoc = gql`
    fragment WholeApplication on Application {
  id
  place
  datetime {
    date
    time
  }
}
    `;
export const WholeCustomerFragmentDoc = gql`
    fragment WholeCustomer on Customer {
  id
  fullname
  label
  address {
    zip
    country
    region
    city
    street
    building
    room
  }
  tel
  email
}
    `;
export const WholeGeneralCustomerFragmentDoc = gql`
    fragment WholeGeneralCustomer on GeneralCustomer {
  id
  fullname
  label
  address {
    zip
    country
    region
    city
    street
    building
    room
  }
  tel
  email
}
    `;
export const WholeLabFragmentDoc = gql`
    fragment WholeLab on Lab {
  id
  fullname
  label
  address {
    zip
    country
    region
    city
    street
    building
    room
  }
  tel
  email
}
    `;
export const ReqForOptionsFragmentDoc = gql`
    fragment ReqForOptions on Lab {
  id
  label
}
    `;
export const PostActDocument = gql`
    mutation PostAct($data: NewActDto!) {
  createAct(newActData: $data) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PostActGQL extends Apollo.Mutation<PostActMutation, PostActMutationVariables> {
    document = PostActDocument;
    
  }
export const PatchActDocument = gql`
    mutation PatchAct($data: PatchActDto!) {
  updateAct(updateActData: $data) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatchActGQL extends Apollo.Mutation<PatchActMutation, PatchActMutationVariables> {
    document = PatchActDocument;
    
  }
export const CreatAppDocument = gql`
    mutation CreatApp {
  createApplication {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatAppGQL extends Apollo.Mutation<CreatAppMutation, CreatAppMutationVariables> {
    document = CreatAppDocument;
    
  }
export const CreateAppCopyDocument = gql`
    mutation CreateAppCopy($data: CopyAppDto!) {
  createAppCopy(copyAppData: $data) {
    ...WholeApplication
  }
}
    ${WholeApplicationFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAppCopyGQL extends Apollo.Mutation<CreateAppCopyMutation, CreateAppCopyMutationVariables> {
    document = CreateAppCopyDocument;
    
  }
export const DeleteAppDocument = gql`
    mutation DeleteApp($data: String!) {
  deleteApplication(id: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAppGQL extends Apollo.Mutation<DeleteAppMutation, DeleteAppMutationVariables> {
    document = DeleteAppDocument;
    
  }
export const CreateCustomerThroughOptionDocument = gql`
    mutation CreateCustomerThroughOption($data: CreateCustomerDto!) {
  createCustomer(createCustomerData: $data) {
    id
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCustomerThroughOptionGQL extends Apollo.Mutation<CreateCustomerThroughOptionMutation, CreateCustomerThroughOptionMutationVariables> {
    document = CreateCustomerThroughOptionDocument;
    
  }
export const PatchCustomerThroughOptionDocument = gql`
    mutation PatchCustomerThroughOption($data: PatchCustomerDto!) {
  updateCustomer(updateCustomerData: $data) {
    id
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatchCustomerThroughOptionGQL extends Apollo.Mutation<PatchCustomerThroughOptionMutation, PatchCustomerThroughOptionMutationVariables> {
    document = PatchCustomerThroughOptionDocument;
    
  }
export const DroppDocDocument = gql`
    mutation DroppDoc($actId: String!, $name: String!, $mimetype: String!) {
  droppDoc(actId: $actId, name: $name, mimetype: $mimetype) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DroppDocGQL extends Apollo.Mutation<DroppDocMutation, DroppDocMutationVariables> {
    document = DroppDocDocument;
    
  }
export const TitlingDocDocument = gql`
    mutation titlingDoc($data: TitlingDocInput!) {
  titlingDoc(titlingDocData: $data) {
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TitlingDocGQL extends Apollo.Mutation<TitlingDocMutation, TitlingDocMutationVariables> {
    document = TitlingDocDocument;
    
  }
export const RemoveDocDocument = gql`
    mutation removeDoc($docId: String!) {
  removeDoc(docId: $docId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveDocGQL extends Apollo.Mutation<RemoveDocMutation, RemoveDocMutationVariables> {
    document = RemoveDocDocument;
    
  }
export const CreateGeneralCustomerThroughOptionDocument = gql`
    mutation CreateGeneralCustomerThroughOption($data: CreateGeneralCustomerDto!) {
  createGeneralCustomer(createGeneralCustomerData: $data) {
    id
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateGeneralCustomerThroughOptionGQL extends Apollo.Mutation<CreateGeneralCustomerThroughOptionMutation, CreateGeneralCustomerThroughOptionMutationVariables> {
    document = CreateGeneralCustomerThroughOptionDocument;
    
  }
export const PatchGeneralCustomerThroughOptionDocument = gql`
    mutation PatchGeneralCustomerThroughOption($data: InsertGeneralCustomerDto!) {
  updateGeneralCustomer(insertGeneralCustomerData: $data) {
    id
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PatchGeneralCustomerThroughOptionGQL extends Apollo.Mutation<PatchGeneralCustomerThroughOptionMutation, PatchGeneralCustomerThroughOptionMutationVariables> {
    document = PatchGeneralCustomerThroughOptionDocument;
    
  }
export const CreateLabThroughOptionDocument = gql`
    mutation CreateLabThroughOption($data: CreateLabDto!) {
  createLab(createLabData: $data) {
    ...ReqForOptions
  }
}
    ${ReqForOptionsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateLabThroughOptionGQL extends Apollo.Mutation<CreateLabThroughOptionMutation, CreateLabThroughOptionMutationVariables> {
    document = CreateLabThroughOptionDocument;
    
  }
export const PatchLabThroughOptionDocument = gql`
    mutation PatchLabThroughOption($data: InsertLabDto!) {
  updateLab(insertLabData: $data) {
    ...ReqForOptions
  }
}
    ${ReqForOptionsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PatchLabThroughOptionGQL extends Apollo.Mutation<PatchLabThroughOptionMutation, PatchLabThroughOptionMutationVariables> {
    document = PatchLabThroughOptionDocument;
    
  }
export const CreateLabTosRuleDocument = gql`
    mutation CreateLabTOSRule($data: NewLabTypeOfSampleTemplate!) {
  createLabTypeOfSampleTemplate(newLabTypeOfSampleTemplateData: $data) {
    path
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateLabTosRuleGQL extends Apollo.Mutation<CreateLabTosRuleMutation, CreateLabTosRuleMutationVariables> {
    document = CreateLabTosRuleDocument;
    
  }
export const UpdateLabTosRuleDocument = gql`
    mutation UpdateLabTOSRule($data: NewLabTypeOfSampleTemplate!) {
  updateLabTypeOfSampleTemplate(patchLabTypeOfSampleTemplateData: $data) {
    path
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateLabTosRuleGQL extends Apollo.Mutation<UpdateLabTosRuleMutation, UpdateLabTosRuleMutationVariables> {
    document = UpdateLabTosRuleDocument;
    
  }
export const CreatePdfDocument = gql`
    mutation CreatePdf($actId: String!, $path: String!) {
  createPdf(actId: $actId, path: $path) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePdfGQL extends Apollo.Mutation<CreatePdfMutation, CreatePdfMutationVariables> {
    document = CreatePdfDocument;
    
  }
export const CreateHabitanDocument = gql`
    mutation CreateHabitan($data: String!) {
  createHabitan(label: $data) {
    id
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateHabitanGQL extends Apollo.Mutation<CreateHabitanMutation, CreateHabitanMutationVariables> {
    document = CreateHabitanDocument;
    
  }
export const CreateHTypeDocument = gql`
    mutation CreateHType($data: CreateHTypeDto!) {
  createHabitansType(createHTypeData: $data) {
    id
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateHTypeGQL extends Apollo.Mutation<CreateHTypeMutation, CreateHTypeMutationVariables> {
    document = CreateHTypeDocument;
    
  }
export const UpdateHabitanDocument = gql`
    mutation UpdateHabitan($id: String!, $label: String!) {
  updateHabitan(id: $id, label: $label) {
    id
    label
    htypes {
      id
      label
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateHabitanGQL extends Apollo.Mutation<UpdateHabitanMutation, UpdateHabitanMutationVariables> {
    document = UpdateHabitanDocument;
    
  }
export const UpdateHTypeDocument = gql`
    mutation UpdateHType($id: String!, $label: String!) {
  updateHabitansType(id: $id, label: $label) {
    id
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateHTypeGQL extends Apollo.Mutation<UpdateHTypeMutation, UpdateHTypeMutationVariables> {
    document = UpdateHTypeDocument;
    
  }
export const GetAllActsDocument = gql`
    query getAllActs {
  getActs {
    id
    name
    customer {
      id
      label
    }
    generalCustomer {
      id
      label
    }
    lab {
      id
      label
    }
    datetime {
      date
      time
    }
    docs {
      id
      title
      ydUrl
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllActsGQL extends Apollo.Query<GetAllActsQuery, GetAllActsQueryVariables> {
    document = GetAllActsDocument;
    
  }
export const GetWholeActDocument = gql`
    query getWholeAct($id: String!) {
  getAct(id: $id) {
    ...WholeAct
  }
}
    ${WholeActFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetWholeActGQL extends Apollo.Query<GetWholeActQuery, GetWholeActQueryVariables> {
    document = GetWholeActDocument;
    
  }
export const GetCustomersForOptionDocument = gql`
    query getCustomersForOption {
  getCustomers {
    id
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCustomersForOptionGQL extends Apollo.Query<GetCustomersForOptionQuery, GetCustomersForOptionQueryVariables> {
    document = GetCustomersForOptionDocument;
    
  }
export const GetWholeCustomerDocument = gql`
    query getWholeCustomer($data: String!) {
  customer(id: $data) {
    ...WholeCustomer
  }
}
    ${WholeCustomerFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetWholeCustomerGQL extends Apollo.Query<GetWholeCustomerQuery, GetWholeCustomerQueryVariables> {
    document = GetWholeCustomerDocument;
    
  }
export const GetCustomersWithActsDocument = gql`
    query getCustomersWithActs {
  getCustomers {
    id
    label
    acts {
      id
      name
      datetime {
        date
      }
      lab {
        id
        label
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCustomersWithActsGQL extends Apollo.Query<GetCustomersWithActsQuery, GetCustomersWithActsQueryVariables> {
    document = GetCustomersWithActsDocument;
    
  }
export const GetGeneralCustomersForOptionDocument = gql`
    query getGeneralCustomersForOption {
  getGeneralCustomers {
    id
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetGeneralCustomersForOptionGQL extends Apollo.Query<GetGeneralCustomersForOptionQuery, GetGeneralCustomersForOptionQueryVariables> {
    document = GetGeneralCustomersForOptionDocument;
    
  }
export const GetGeneralCustomerDocument = gql`
    query getGeneralCustomer($data: String!) {
  getGeneralCustomer(id: $data) {
    ...WholeGeneralCustomer
  }
}
    ${WholeGeneralCustomerFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetGeneralCustomerGQL extends Apollo.Query<GetGeneralCustomerQuery, GetGeneralCustomerQueryVariables> {
    document = GetGeneralCustomerDocument;
    
  }
export const GetLabsForOptionDocument = gql`
    query getLabsForOption {
  getLabs {
    id
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLabsForOptionGQL extends Apollo.Query<GetLabsForOptionQuery, GetLabsForOptionQueryVariables> {
    document = GetLabsForOptionDocument;
    
  }
export const GetLabDocument = gql`
    query getLab($data: String!) {
  getLab(id: $data) {
    ...WholeLab
  }
}
    ${WholeLabFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLabGQL extends Apollo.Query<GetLabQuery, GetLabQueryVariables> {
    document = GetLabDocument;
    
  }
export const GetActForItemDocument = gql`
    query getActForItem {
  getActs {
    id
    name
    status
    lab {
      label
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetActForItemGQL extends Apollo.Query<GetActForItemQuery, GetActForItemQueryVariables> {
    document = GetActForItemDocument;
    
  }
export const GetActIdsDocument = gql`
    query getActIds {
  getActs {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetActIdsGQL extends Apollo.Query<GetActIdsQuery, GetActIdsQueryVariables> {
    document = GetActIdsDocument;
    
  }
export const GetActForDetailsDocument = gql`
    query getActForDetails($actId: String!) {
  getAct(id: $actId) {
    id
    name
    typeOfSample {
      habitan {
        id
      }
    }
    lab {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetActForDetailsGQL extends Apollo.Query<GetActForDetailsQuery, GetActForDetailsQueryVariables> {
    document = GetActForDetailsDocument;
    
  }
export const GetGeneratePathDocument = gql`
    query getGeneratePath($labId: String!, $typeId: String!) {
  getLabTypeOfSampleTemplate(labId: $labId, typeId: $typeId) {
    path
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetGeneratePathGQL extends Apollo.Query<GetGeneratePathQuery, GetGeneratePathQueryVariables> {
    document = GetGeneratePathDocument;
    
  }
export const GetHabitansOptionDocument = gql`
    query getHabitansOption {
  getAllHabitans {
    id
    label
    htypes {
      id
      label
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetHabitansOptionGQL extends Apollo.Query<GetHabitansOptionQuery, GetHabitansOptionQueryVariables> {
    document = GetHabitansOptionDocument;
    
  }