import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  _FieldSet: any;
};








export type Act = {
   __typename?: 'Act';
  id: Scalars['ID'];
  name: Scalars['String'];
  customer: Customer;
  docs?: Maybe<Array<Doc>>;
  datetime: DateAndTime;
  general_customer: GeneralCustomer;
  lab: Lab;
  typeOfSample: TypeOfSample;
  objectName?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  toolType?: Maybe<Scalars['String']>;
  climaticEnvironmental?: Maybe<Scalars['String']>;
  planning?: Maybe<Scalars['String']>;
  normativeDocument?: Maybe<Array<Scalars['String']>>;
  sampleType?: Maybe<Scalars['String']>;
  sample?: Maybe<Array<Scalars['String']>>;
  preparation?: Maybe<Array<Scalars['String']>>;
  goal?: Maybe<Scalars['String']>;
  definedIndicators?: Maybe<Array<Scalars['String']>>;
  additions?: Maybe<Scalars['String']>;
  informationAboutSelection?: Maybe<Scalars['String']>;
  environmentalEngineer?: Maybe<Scalars['String']>;
  representative?: Maybe<Scalars['String']>;
  passedSample?: Maybe<Scalars['String']>;
  application: Application;
  status: Scalars['String'];
  events?: Maybe<Array<ActEvent>>;
};

export type ActEvent = {
   __typename?: 'ActEvent';
  id: Scalars['ID'];
  act: Act;
  event?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Application = {
   __typename?: 'Application';
  place?: Maybe<Scalars['String']>;
  datetime: DateAndTime;
};

export type CreateCustomerDto = {
  fullname: Scalars['String'];
};

export type CreateGeneralCustomerDto = {
  fullname: Scalars['String'];
};

export type CreateLabDto = {
  fullname: Scalars['String'];
};

export type Customer = {
   __typename?: 'Customer';
  id: Scalars['ID'];
  fullname: Scalars['String'];
  label: Scalars['String'];
  address: CustomerAddress;
  tel: Scalars['String'];
  email: Scalars['String'];
  events: Array<CustomerEvent>;
  acts: Array<Act>;
};

export type CustomerAddress = {
   __typename?: 'CustomerAddress';
  zip: Scalars['String'];
};

export type CustomerEvent = {
   __typename?: 'CustomerEvent';
  id: Scalars['ID'];
};

export type DateAndTime = {
   __typename?: 'DateAndTime';
  date?: Maybe<Scalars['DateTime']>;
  time?: Maybe<Scalars['String']>;
};


export type Doc = {
   __typename?: 'Doc';
  id: Scalars['ID'];
  events?: Maybe<Array<Maybe<DocEvent>>>;
  title?: Maybe<Scalars['String']>;
  ydUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  downloadable: Scalars['Boolean'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  act: Act;
};

export type DocEvent = {
   __typename?: 'DocEvent';
  id: Scalars['ID'];
  doc?: Maybe<Doc>;
  event?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type GcAddress = {
   __typename?: 'GCAddress';
  zip?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  room?: Maybe<Scalars['String']>;
};

export type GeneralCustomer = {
   __typename?: 'GeneralCustomer';
  id: Scalars['ID'];
  fullname: Scalars['String'];
  label: Scalars['String'];
  address: GcAddress;
  tel?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  evnets: Array<GsEvent>;
  acts: Array<Act>;
};

export type GsEvent = {
   __typename?: 'GSEvent';
  id: Scalars['ID'];
  event: Scalars['String'];
  general_customer: GeneralCustomer;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type InsertGeneralCustomerDto = {
  id: Scalars['String'];
};

export type InsertLabDto = {
  id: Scalars['String'];
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
  county?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  room?: Maybe<Scalars['String']>;
};

export type LabEvent = {
   __typename?: 'LabEvent';
  id: Scalars['ID'];
  event: Scalars['String'];
  lab: Lab;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createAct: Act;
  updateAct: Act;
  createCustomer: Customer;
  updateCustomer: Customer;
  createGeneralCustomer: GeneralCustomer;
  updateGeneralCustomer: GeneralCustomer;
  createLab: Lab;
  updateLab: Lab;
  droppDoc: Doc;
  titlingDoc: Doc;
  savingDoc: Doc;
  savingAllDocs: Array<Doc>;
  removeDoc: Doc;
  deleteDoc: Doc;
};


export type MutationCreateActArgs = {
  newActData: NewActDto;
};


export type MutationUpdateActArgs = {
  updateActData: PatchActDto;
};


export type MutationCreateCustomerArgs = {
  createCustomerData: CreateCustomerDto;
};


export type MutationUpdateCustomerArgs = {
  updateCustomerData: PatchCustomerDto;
};


export type MutationCreateGeneralCustomerArgs = {
  createGeneralCustomerData: CreateGeneralCustomerDto;
};


export type MutationUpdateGeneralCustomerArgs = {
  insertGeneralCustomerData: InsertGeneralCustomerDto;
};


export type MutationCreateLabArgs = {
  createLabData: CreateLabDto;
};


export type MutationUpdateLabArgs = {
  insertLabData: InsertLabDto;
};


export type MutationDroppDocArgs = {
  name: Scalars['String'];
  actId: Scalars['String'];
  file: Scalars['Upload'];
};


export type MutationTitlingDocArgs = {
  titlingDocData: TitlingDocInput;
};


export type MutationSavingDocArgs = {
  savingDocData: SavingDocInput;
};


export type MutationSavingAllDocsArgs = {
  savingAllDocsData: SavingAllDocsInput;
};


export type MutationRemoveDocArgs = {
  docId: Scalars['String'];
};


export type MutationDeleteDocArgs = {
  actId: Scalars['String'];
  docId: Scalars['String'];
};

export type NewActDto = {
  name: Scalars['String'];
};

export type PatchActDto = {
  id: Scalars['String'];
};

export type PatchCustomerDto = {
  id: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  getActs: Array<Act>;
  getAct: Act;
  actTransform: Act;
  addActsReferences: Array<Act>;
  getCustomers: Array<Customer>;
  customer: Customer;
  transferCustomers: Customer;
  getGeneralCustomers: Array<GeneralCustomer>;
  getGeneralCustomer: GeneralCustomer;
  transformGCustomers: GeneralCustomer;
  getLabs: Array<Lab>;
  getLab: Lab;
  transformLabs: Lab;
  docs: Array<Doc>;
};


export type QueryGetActArgs = {
  id: Scalars['String'];
};


export type QueryCustomerArgs = {
  id: Scalars['String'];
};


export type QueryGetGeneralCustomerArgs = {
  id: Scalars['String'];
};


export type QueryGetLabArgs = {
  id: Scalars['String'];
};


export type QueryDocsArgs = {
  actId: Scalars['String'];
};

export type SavingAllDocsInput = {
  actId: Scalars['String'];
  docs: Array<Scalars['String']>;
};

export type SavingDocInput = {
  docId: Scalars['String'];
  actId: Scalars['String'];
};

export type TitlingDocInput = {
  docId: Scalars['String'];
  title: Scalars['String'];
};

export type TypeOfSample = {
   __typename?: 'TypeOfSample';
  habitan: Scalars['String'];
  types: Scalars['String'];
};


export type DroppDocMutationVariables = {
  file: Scalars['Upload'];
  actId: Scalars['String'];
  name: Scalars['String'];
};


export type DroppDocMutation = (
  { __typename?: 'Mutation' }
  & { droppDoc: (
    { __typename?: 'Doc' }
    & Pick<Doc, 'id'>
  ) }
);

export type TitlingDocMutationVariables = {
  data: TitlingDocInput;
};


export type TitlingDocMutation = (
  { __typename?: 'Mutation' }
  & { titlingDoc: (
    { __typename?: 'Doc' }
    & Pick<Doc, 'title'>
  ) }
);

export type SavingDocMutationVariables = {
  data: SavingDocInput;
};


export type SavingDocMutation = (
  { __typename?: 'Mutation' }
  & { savingDoc: (
    { __typename?: 'Doc' }
    & Pick<Doc, 'id'>
  ) }
);

export type SavingAllDocsMutationVariables = {
  data: SavingAllDocsInput;
};


export type SavingAllDocsMutation = (
  { __typename?: 'Mutation' }
  & { savingAllDocs: Array<(
    { __typename?: 'Doc' }
    & Pick<Doc, 'id'>
  )> }
);

export type RemoveDocMutationVariables = {
  docId: Scalars['String'];
};


export type RemoveDocMutation = (
  { __typename?: 'Mutation' }
  & { removeDoc: (
    { __typename?: 'Doc' }
    & Pick<Doc, 'id'>
  ) }
);

export type DeleteDocMutationVariables = {
  docId: Scalars['String'];
  actId: Scalars['String'];
};


export type DeleteDocMutation = (
  { __typename?: 'Mutation' }
  & { deleteDoc: (
    { __typename?: 'Doc' }
    & Pick<Doc, 'id'>
  ) }
);

export type GetAllDocsQueryVariables = {
  actId: Scalars['String'];
};


export type GetAllDocsQuery = (
  { __typename?: 'Query' }
  & { getAct: (
    { __typename?: 'Act' }
    & Pick<Act, 'id'>
    & { docs?: Maybe<Array<(
      { __typename?: 'Doc' }
      & Pick<Doc, 'id' | 'name' | 'ydUrl'>
    )>> }
  ) }
);

export type GetLabsQueryVariables = {};


export type GetLabsQuery = (
  { __typename?: 'Query' }
  & { getLabs: Array<(
    { __typename?: 'Lab' }
    & Pick<Lab, 'id' | 'label'>
  )> }
);

export type GetActForItemQueryVariables = {};


export type GetActForItemQuery = (
  { __typename?: 'Query' }
  & { getActs: Array<(
    { __typename?: 'Act' }
    & Pick<Act, 'id' | 'name' | 'status'>
    & { lab: (
      { __typename?: 'Lab' }
      & Pick<Lab, 'label'>
    ) }
  )> }
);

export type GetActIdsQueryVariables = {};


export type GetActIdsQuery = (
  { __typename?: 'Query' }
  & { getActs: Array<(
    { __typename?: 'Act' }
    & Pick<Act, 'id'>
  )> }
);

export type GetActForDetailsQueryVariables = {
  actId: Scalars['String'];
};


export type GetActForDetailsQuery = (
  { __typename?: 'Query' }
  & { getAct: (
    { __typename?: 'Act' }
    & Pick<Act, 'id' | 'name'>
  ) }
);

export const DroppDocDocument = gql`
    mutation droppDoc($file: Upload!, $actId: String!, $name: String!) {
  droppDoc(file: $file, actId: $actId, name: $name) {
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
export const SavingDocDocument = gql`
    mutation savingDoc($data: SavingDocInput!) {
  savingDoc(savingDocData: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SavingDocGQL extends Apollo.Mutation<SavingDocMutation, SavingDocMutationVariables> {
    document = SavingDocDocument;
    
  }
export const SavingAllDocsDocument = gql`
    mutation savingAllDocs($data: SavingAllDocsInput!) {
  savingAllDocs(savingAllDocsData: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SavingAllDocsGQL extends Apollo.Mutation<SavingAllDocsMutation, SavingAllDocsMutationVariables> {
    document = SavingAllDocsDocument;
    
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
export const DeleteDocDocument = gql`
    mutation deleteDoc($docId: String!, $actId: String!) {
  deleteDoc(docId: $docId, actId: $actId) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteDocGQL extends Apollo.Mutation<DeleteDocMutation, DeleteDocMutationVariables> {
    document = DeleteDocDocument;
    
  }
export const GetAllDocsDocument = gql`
    query getAllDocs($actId: String!) {
  getAct(id: $actId) {
    id
    docs {
      id
      name
      ydUrl
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllDocsGQL extends Apollo.Query<GetAllDocsQuery, GetAllDocsQueryVariables> {
    document = GetAllDocsDocument;
    
  }
export const GetLabsDocument = gql`
    query getLabs {
  getLabs {
    id
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLabsGQL extends Apollo.Query<GetLabsQuery, GetLabsQueryVariables> {
    document = GetLabsDocument;
    
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
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetActForDetailsGQL extends Apollo.Query<GetActForDetailsQuery, GetActForDetailsQueryVariables> {
    document = GetActForDetailsDocument;
    
  }