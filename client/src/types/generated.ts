import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  _FieldSet: any;
};

export type Act = {
  __typename?: "Act";
  id: Scalars["ID"];
  name: Scalars["String"];
  customer: Customer;
  docs?: Maybe<Array<Doc>>;
  datetime: DateAndTime;
  general_customer: GeneralCustomer;
  lab: Lab;
  typeOfSample: TypeOfSample;
  objectName?: Maybe<Scalars["String"]>;
  place?: Maybe<Scalars["String"]>;
  method?: Maybe<Scalars["String"]>;
  toolType?: Maybe<Scalars["String"]>;
  climaticEnvironmental?: Maybe<Scalars["String"]>;
  planning?: Maybe<Scalars["String"]>;
  normativeDocument?: Maybe<Array<Scalars["String"]>>;
  sampleType?: Maybe<Scalars["String"]>;
  sample?: Maybe<Array<Scalars["String"]>>;
  preparation?: Maybe<Array<Scalars["String"]>>;
  goal?: Maybe<Scalars["String"]>;
  definedIndicators?: Maybe<Array<Scalars["String"]>>;
  additions?: Maybe<Scalars["String"]>;
  informationAboutSelection?: Maybe<Scalars["String"]>;
  environmentalEngineer?: Maybe<Scalars["String"]>;
  representative?: Maybe<Scalars["String"]>;
  passedSample?: Maybe<Scalars["String"]>;
  application: Application;
  status: Scalars["String"];
  events?: Maybe<Array<ActEvent>>;
};

export type ActEvent = {
  __typename?: "ActEvent";
  id: Scalars["ID"];
  act: Act;
  event?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["String"]>;
};

export type Application = {
  __typename?: "Application";
  place?: Maybe<Scalars["String"]>;
  datetime: DateAndTime;
};

export type CreateCustomerDto = {
  fullname: Scalars["String"];
  label: Scalars["String"];
  address?: Maybe<CustomerAddressInput>;
  tel?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
};

export type CreateGeneralCustomerDto = {
  fullname: Scalars["String"];
  label: Scalars["String"];
  address?: Maybe<GcAdressInput>;
  tel?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
};

export type CreateLabDto = {
  fullname: Scalars["String"];
  label: Scalars["String"];
  address?: Maybe<LabAddressInput>;
  tel?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
};

export type Customer = {
  __typename?: "Customer";
  id: Scalars["ID"];
  fullname: Scalars["String"];
  label: Scalars["String"];
  address: CustomerAddress;
  tel?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  events: Array<CustomerEvent>;
  acts: Array<Act>;
};

export type CustomerAddress = {
  __typename?: "CustomerAddress";
  zip?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  street?: Maybe<Scalars["String"]>;
  building?: Maybe<Scalars["String"]>;
  room?: Maybe<Scalars["String"]>;
};

export type CustomerAddressInput = {
  zip?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  street?: Maybe<Scalars["String"]>;
  building?: Maybe<Scalars["String"]>;
  room?: Maybe<Scalars["String"]>;
};

export type CustomerEvent = {
  __typename?: "CustomerEvent";
  id: Scalars["ID"];
};

export type DateAndTime = {
  __typename?: "DateAndTime";
  date?: Maybe<Scalars["DateTime"]>;
  time?: Maybe<Scalars["String"]>;
};

export type Doc = {
  __typename?: "Doc";
  id: Scalars["ID"];
  docEvents?: Maybe<Array<Maybe<DocEvent>>>;
  title?: Maybe<Scalars["String"]>;
  ydUrl?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  downloadable: Scalars["Boolean"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  act: Act;
};

export type DocEvent = {
  __typename?: "DocEvent";
  id: Scalars["ID"];
  doc?: Maybe<Doc>;
  event?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["String"]>;
};

export type GcAddress = {
  __typename?: "GCAddress";
  zip?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  street?: Maybe<Scalars["String"]>;
  building?: Maybe<Scalars["String"]>;
  room?: Maybe<Scalars["String"]>;
};

export type GcAdressInput = {
  zip?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  street?: Maybe<Scalars["String"]>;
  building?: Maybe<Scalars["String"]>;
  room?: Maybe<Scalars["String"]>;
};

export type GeneralCustomer = {
  __typename?: "GeneralCustomer";
  id: Scalars["ID"];
  fullname: Scalars["String"];
  label: Scalars["String"];
  address: GcAddress;
  tel?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  evnets: Scalars["String"];
  acts: Array<Act>;
};

export type Habitan = {
  __typename?: "Habitan";
  id: Scalars["ID"];
  label: Scalars["String"];
  htypes: Array<HabitansType>;
  type_of_samples: Array<TypeOfSample>;
};

export type HabitansType = {
  __typename?: "HabitansType";
  id: Scalars["ID"];
  label: Scalars["String"];
  habitan: Habitan;
  type_of_samples: TypeOfSample;
};

export type InsertGeneralCustomerDto = {
  id: Scalars["String"];
  fullname?: Maybe<Scalars["String"]>;
  label?: Maybe<Scalars["String"]>;
  address?: Maybe<GcAdressInput>;
  tel?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
};

export type InsertLabDto = {
  id: Scalars["String"];
  fullname?: Maybe<Scalars["String"]>;
  label?: Maybe<Scalars["String"]>;
  address?: Maybe<LabAddressInput>;
  tel?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
};

export type Lab = {
  __typename?: "Lab";
  id: Scalars["ID"];
  fullname: Scalars["String"];
  label: Scalars["String"];
  address: LabAddress;
  tel?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  events: Array<LabEvent>;
  acts: Array<Act>;
};

export type LabAddress = {
  __typename?: "LabAddress";
  zip?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  street?: Maybe<Scalars["String"]>;
  building?: Maybe<Scalars["String"]>;
  room?: Maybe<Scalars["String"]>;
};

export type LabAddressInput = {
  zip?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  street?: Maybe<Scalars["String"]>;
  building?: Maybe<Scalars["String"]>;
  room?: Maybe<Scalars["String"]>;
};

export type LabEvent = {
  __typename?: "LabEvent";
  id: Scalars["ID"];
};

export type LabTypeOfSampleTemplateModel = {
  __typename?: "LabTypeOfSampleTemplateModel";
  labId: Scalars["String"];
  typeOfSampleId: Scalars["String"];
  path: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createLabTypeOfSampleTemplate: LabTypeOfSampleTemplateModel;
  createHabitan: Habitan;
  updateHabitan: Habitan;
  createHabitnsType: HabitansType;
  updateHabitansType: HabitansType;
  createAct: Act;
  updateAct: Act;
  createLab: Lab;
  updateLab: Lab;
  createGeneralCustomer: GeneralCustomer;
  updateGeneralCustomer: GeneralCustomer;
  droppDoc: Doc;
  titlingDoc: Doc;
  savingDoc: Doc;
  savingAllDocs: Array<Doc>;
  removeDoc: Doc;
  deleteDoc: Doc;
  createCustomer: Customer;
  updateCustomer: Customer;
};

export type MutationCreateLabTypeOfSampleTemplateArgs = {
  newLabTypeOfSampleTemplateData: NewLabTypeOfSampleTemplate;
};

export type MutationCreateHabitanArgs = {
  label: Scalars["String"];
};

export type MutationUpdateHabitanArgs = {
  label: Scalars["String"];
  id: Scalars["String"];
};

export type MutationCreateHabitnsTypeArgs = {
  label: Scalars["String"];
};

export type MutationUpdateHabitansTypeArgs = {
  label: Scalars["String"];
  id: Scalars["String"];
};

export type MutationCreateActArgs = {
  newActData: NewActDto;
};

export type MutationUpdateActArgs = {
  updateActData: PatchActDto;
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
  name: Scalars["String"];
  actId: Scalars["String"];
  file: Scalars["Upload"];
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
  docId: Scalars["String"];
};

export type MutationDeleteDocArgs = {
  actId: Scalars["String"];
  docId: Scalars["String"];
};

export type MutationCreateCustomerArgs = {
  createCustomerData: CreateCustomerDto;
};

export type MutationUpdateCustomerArgs = {
  updateCustomerData: PatchCustomerDto;
};

export type NewActDto = {
  name: Scalars["String"];
};

export type NewLabTypeOfSampleTemplate = {
  labId: Scalars["String"];
};

export type PatchActDto = {
  id: Scalars["String"];
};

export type PatchCustomerDto = {
  id: Scalars["String"];
  fullname?: Maybe<Scalars["String"]>;
  label?: Maybe<Scalars["String"]>;
  address?: Maybe<CustomerAddressInput>;
  tel?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  getLabTypeOfSampleTemplate: LabTypeOfSampleTemplateModel;
  getTypeOfSample: TypeOfSample;
  getAllHabitans: Habitan;
  getActs: Array<Act>;
  getAct: Act;
  actTransform: Act;
  addActsReferences: Array<Act>;
  getLabs: Array<Lab>;
  getLab: Lab;
  transformLabs: Lab;
  getGeneralCustomers: Array<GeneralCustomer>;
  getGeneralCustomer: GeneralCustomer;
  transformGCustomers: GeneralCustomer;
  docs: Array<Doc>;
  getCustomers: Array<Customer>;
  customer: Customer;
  transferCustomers: Customer;
};

export type QueryGetLabTypeOfSampleTemplateArgs = {
  typeId: Scalars["String"];
  labId: Scalars["String"];
};

export type QueryGetTypeOfSampleArgs = {
  id: Scalars["String"];
};

export type QueryGetActArgs = {
  id: Scalars["String"];
};

export type QueryGetLabArgs = {
  id: Scalars["String"];
};

export type QueryGetGeneralCustomerArgs = {
  id: Scalars["String"];
};

export type QueryDocsArgs = {
  actId: Scalars["String"];
};

export type QueryCustomerArgs = {
  id: Scalars["String"];
};

export type SavingAllDocsInput = {
  actId: Scalars["String"];
  docs: Array<Scalars["String"]>;
};

export type SavingDocInput = {
  docId: Scalars["String"];
  actId: Scalars["String"];
};

export type TitlingDocInput = {
  docId: Scalars["String"];
  title: Scalars["String"];
};

export type TypeOfSample = {
  __typename?: "TypeOfSample";
  id: Scalars["ID"];
  habitan: Habitan;
  htype: HabitansType;
  acts: Array<Act>;
};

export type WholeCustomerFragment = { __typename?: "Customer" } & Pick<
  Customer,
  "id" | "fullname" | "label" | "tel" | "email"
> & {
    address: { __typename?: "CustomerAddress" } & Pick<
      CustomerAddress,
      "zip" | "country" | "region" | "city" | "street" | "building" | "room"
    >;
  };

export type WholeGeneralCustomerFragment = {
  __typename?: "GeneralCustomer";
} & Pick<GeneralCustomer, "id" | "fullname" | "label" | "tel" | "email"> & {
    address: { __typename?: "GCAddress" } & Pick<
      GcAddress,
      "zip" | "country" | "region" | "city" | "street" | "building" | "room"
    >;
  };

export type WholeLabFragment = { __typename?: "Lab" } & Pick<
  Lab,
  "id" | "fullname" | "label" | "tel" | "email"
> & {
    address: { __typename?: "LabAddress" } & Pick<
      LabAddress,
      "zip" | "country" | "region" | "city" | "street" | "building" | "room"
    >;
  };

export type ReqForOptionsFragment = { __typename?: "Lab" } & Pick<
  Lab,
  "id" | "label"
>;

export type CreateCustomerThroughOptionMutationVariables = Exact<{
  data: CreateCustomerDto;
}>;

export type CreateCustomerThroughOptionMutation = {
  __typename?: "Mutation";
} & {
  createCustomer: { __typename?: "Customer" } & Pick<Customer, "id" | "label">;
};

export type PatchCustomerThroughOptionMutationVariables = Exact<{
  data: PatchCustomerDto;
}>;

export type PatchCustomerThroughOptionMutation = { __typename?: "Mutation" } & {
  updateCustomer: { __typename?: "Customer" } & Pick<Customer, "id" | "label">;
};

export type CreateGeneralCustomerThroughOptionMutationVariables = Exact<{
  data: CreateGeneralCustomerDto;
}>;

export type CreateGeneralCustomerThroughOptionMutation = {
  __typename?: "Mutation";
} & {
  createGeneralCustomer: { __typename?: "GeneralCustomer" } & Pick<
    GeneralCustomer,
    "id" | "label"
  >;
};

export type PatchGeneralCustomerThroughOptionMutationVariables = Exact<{
  data: InsertGeneralCustomerDto;
}>;

export type PatchGeneralCustomerThroughOptionMutation = {
  __typename?: "Mutation";
} & {
  updateGeneralCustomer: { __typename?: "GeneralCustomer" } & Pick<
    GeneralCustomer,
    "id" | "label"
  >;
};

export type CreateLabThroughOptionMutationVariables = Exact<{
  data: CreateLabDto;
}>;

export type CreateLabThroughOptionMutation = { __typename?: "Mutation" } & {
  createLab: { __typename?: "Lab" } & ReqForOptionsFragment;
};

export type PatchLabThroughOptionMutationVariables = Exact<{
  data: InsertLabDto;
}>;

export type PatchLabThroughOptionMutation = { __typename?: "Mutation" } & {
  updateLab: { __typename?: "Lab" } & ReqForOptionsFragment;
};

export type TitlingDocMutationVariables = Exact<{
  data: TitlingDocInput;
}>;

export type TitlingDocMutation = { __typename?: "Mutation" } & {
  titlingDoc: { __typename?: "Doc" } & Pick<Doc, "title">;
};

export type SavingDocMutationVariables = Exact<{
  data: SavingDocInput;
}>;

export type SavingDocMutation = { __typename?: "Mutation" } & {
  savingDoc: { __typename?: "Doc" } & Pick<Doc, "id">;
};

export type SavingAllDocsMutationVariables = Exact<{
  data: SavingAllDocsInput;
}>;

export type SavingAllDocsMutation = { __typename?: "Mutation" } & {
  savingAllDocs: Array<{ __typename?: "Doc" } & Pick<Doc, "id">>;
};

export type RemoveDocMutationVariables = Exact<{
  docId: Scalars["String"];
}>;

export type RemoveDocMutation = { __typename?: "Mutation" } & {
  removeDoc: { __typename?: "Doc" } & Pick<Doc, "id">;
};

export type DeleteDocMutationVariables = Exact<{
  docId: Scalars["String"];
  actId: Scalars["String"];
}>;

export type DeleteDocMutation = { __typename?: "Mutation" } & {
  deleteDoc: { __typename?: "Doc" } & Pick<Doc, "id">;
};

export type GetCustomersForOptionQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetCustomersForOptionQuery = { __typename?: "Query" } & {
  getCustomers: Array<
    { __typename?: "Customer" } & Pick<Customer, "id" | "label">
  >;
};

export type GetCustomerQueryVariables = Exact<{
  data: Scalars["String"];
}>;

export type GetCustomerQuery = { __typename?: "Query" } & {
  customer: { __typename?: "Customer" } & WholeCustomerFragment;
};

export type GetGeneralCustomersForOptionQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetGeneralCustomersForOptionQuery = { __typename?: "Query" } & {
  getGeneralCustomers: Array<
    { __typename?: "GeneralCustomer" } & Pick<GeneralCustomer, "id" | "label">
  >;
};

export type GetGeneralCustomerQueryVariables = Exact<{
  data: Scalars["String"];
}>;

export type GetGeneralCustomerQuery = { __typename?: "Query" } & {
  getGeneralCustomer: {
    __typename?: "GeneralCustomer";
  } & WholeGeneralCustomerFragment;
};

export type GetLabsForOptionQueryVariables = Exact<{ [key: string]: never }>;

export type GetLabsForOptionQuery = { __typename?: "Query" } & {
  getLabs: Array<{ __typename?: "Lab" } & Pick<Lab, "id" | "label">>;
};

export type GetLabQueryVariables = Exact<{
  data: Scalars["String"];
}>;

export type GetLabQuery = { __typename?: "Query" } & {
  getLab: { __typename?: "Lab" } & WholeLabFragment;
};

export type GetAllDocsQueryVariables = Exact<{
  actId: Scalars["String"];
}>;

export type GetAllDocsQuery = { __typename?: "Query" } & {
  getAct: { __typename?: "Act" } & Pick<Act, "id"> & {
      docs?: Maybe<
        Array<{ __typename?: "Doc" } & Pick<Doc, "id" | "name" | "ydUrl">>
      >;
    };
};

export type GetActForItemQueryVariables = Exact<{ [key: string]: never }>;

export type GetActForItemQuery = { __typename?: "Query" } & {
  getActs: Array<
    { __typename?: "Act" } & Pick<Act, "id" | "name" | "status"> & {
        lab: { __typename?: "Lab" } & Pick<Lab, "label">;
      }
  >;
};

export type GetActIdsQueryVariables = Exact<{ [key: string]: never }>;

export type GetActIdsQuery = { __typename?: "Query" } & {
  getActs: Array<{ __typename?: "Act" } & Pick<Act, "id">>;
};

export type GetActForDetailsQueryVariables = Exact<{
  actId: Scalars["String"];
}>;

export type GetActForDetailsQuery = { __typename?: "Query" } & {
  getAct: { __typename?: "Act" } & Pick<Act, "id" | "name">;
};

export type GetHabitansOptionQueryVariables = Exact<{ [key: string]: never }>;

export type GetHabitansOptionQuery = { __typename?: "Query" } & {
  getAllHabitans: Array<
    { __typename?: "Habitan" } & Pick<Habitan, "id" | "label"> & {
        htypes: Array<
          { __typename?: "HabitansType" } & Pick<HabitansType, "id" | "label">
        >;
      }
  >;
};

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
export const CreateCustomerThroughOptionDocument = gql`
  mutation CreateCustomerThroughOption($data: CreateCustomerDto!) {
    createCustomer(createCustomerData: $data) {
      id
      label
    }
  }
`;

@Injectable({
  providedIn: "root",
})
export class CreateCustomerThroughOptionGQL extends Apollo.Mutation<
  CreateCustomerThroughOptionMutation,
  CreateCustomerThroughOptionMutationVariables
> {
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
  providedIn: "root",
})
export class PatchCustomerThroughOptionGQL extends Apollo.Mutation<
  PatchCustomerThroughOptionMutation,
  PatchCustomerThroughOptionMutationVariables
> {
  document = PatchCustomerThroughOptionDocument;
}
export const CreateGeneralCustomerThroughOptionDocument = gql`
  mutation CreateGeneralCustomerThroughOption(
    $data: CreateGeneralCustomerDto!
  ) {
    createGeneralCustomer(createGeneralCustomerData: $data) {
      id
      label
    }
  }
`;

@Injectable({
  providedIn: "root",
})
export class CreateGeneralCustomerThroughOptionGQL extends Apollo.Mutation<
  CreateGeneralCustomerThroughOptionMutation,
  CreateGeneralCustomerThroughOptionMutationVariables
> {
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
  providedIn: "root",
})
export class PatchGeneralCustomerThroughOptionGQL extends Apollo.Mutation<
  PatchGeneralCustomerThroughOptionMutation,
  PatchGeneralCustomerThroughOptionMutationVariables
> {
  document = PatchGeneralCustomerThroughOptionDocument;
}
export const CreateLabThroughOptionDocument = gql`
  mutation CreateLabThroughOption($data: CreateLabDto!) {
    createLab(createLabData: $data) {
      ...ReqForOptions
    }
  }
  ${ReqForOptionsFragmentDoc}
`;

@Injectable({
  providedIn: "root",
})
export class CreateLabThroughOptionGQL extends Apollo.Mutation<
  CreateLabThroughOptionMutation,
  CreateLabThroughOptionMutationVariables
> {
  document = CreateLabThroughOptionDocument;
}
export const PatchLabThroughOptionDocument = gql`
  mutation PatchLabThroughOption($data: InsertLabDto!) {
    updateLab(insertLabData: $data) {
      ...ReqForOptions
    }
  }
  ${ReqForOptionsFragmentDoc}
`;

@Injectable({
  providedIn: "root",
})
export class PatchLabThroughOptionGQL extends Apollo.Mutation<
  PatchLabThroughOptionMutation,
  PatchLabThroughOptionMutationVariables
> {
  document = PatchLabThroughOptionDocument;
}
export const TitlingDocDocument = gql`
  mutation titlingDoc($data: TitlingDocInput!) {
    titlingDoc(titlingDocData: $data) {
      title
    }
  }
`;

@Injectable({
  providedIn: "root",
})
export class TitlingDocGQL extends Apollo.Mutation<
  TitlingDocMutation,
  TitlingDocMutationVariables
> {
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
  providedIn: "root",
})
export class SavingDocGQL extends Apollo.Mutation<
  SavingDocMutation,
  SavingDocMutationVariables
> {
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
  providedIn: "root",
})
export class SavingAllDocsGQL extends Apollo.Mutation<
  SavingAllDocsMutation,
  SavingAllDocsMutationVariables
> {
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
  providedIn: "root",
})
export class RemoveDocGQL extends Apollo.Mutation<
  RemoveDocMutation,
  RemoveDocMutationVariables
> {
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
  providedIn: "root",
})
export class DeleteDocGQL extends Apollo.Mutation<
  DeleteDocMutation,
  DeleteDocMutationVariables
> {
  document = DeleteDocDocument;
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
  providedIn: "root",
})
export class GetCustomersForOptionGQL extends Apollo.Query<
  GetCustomersForOptionQuery,
  GetCustomersForOptionQueryVariables
> {
  document = GetCustomersForOptionDocument;
}
export const GetCustomerDocument = gql`
  query getCustomer($data: String!) {
    customer(id: $data) {
      ...WholeCustomer
    }
  }
  ${WholeCustomerFragmentDoc}
`;

@Injectable({
  providedIn: "root",
})
export class GetCustomerGQL extends Apollo.Query<
  GetCustomerQuery,
  GetCustomerQueryVariables
> {
  document = GetCustomerDocument;
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
  providedIn: "root",
})
export class GetGeneralCustomersForOptionGQL extends Apollo.Query<
  GetGeneralCustomersForOptionQuery,
  GetGeneralCustomersForOptionQueryVariables
> {
  document = GetGeneralCustomersForOptionDocument;
}
export const GetGeneralCustomerDocument = gql`
  query getGeneralCustomer($data: String!) {
    getGeneralCustomer(id: $data) {
      ...WholeGeneralCustomer
    }
  }
  ${WholeGeneralCustomerFragmentDoc}
`;

@Injectable({
  providedIn: "root",
})
export class GetGeneralCustomerGQL extends Apollo.Query<
  GetGeneralCustomerQuery,
  GetGeneralCustomerQueryVariables
> {
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
  providedIn: "root",
})
export class GetLabsForOptionGQL extends Apollo.Query<
  GetLabsForOptionQuery,
  GetLabsForOptionQueryVariables
> {
  document = GetLabsForOptionDocument;
}
export const GetLabDocument = gql`
  query getLab($data: String!) {
    getLab(id: $data) {
      ...WholeLab
    }
  }
  ${WholeLabFragmentDoc}
`;

@Injectable({
  providedIn: "root",
})
export class GetLabGQL extends Apollo.Query<GetLabQuery, GetLabQueryVariables> {
  document = GetLabDocument;
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
  providedIn: "root",
})
export class GetAllDocsGQL extends Apollo.Query<
  GetAllDocsQuery,
  GetAllDocsQueryVariables
> {
  document = GetAllDocsDocument;
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
  providedIn: "root",
})
export class GetActForItemGQL extends Apollo.Query<
  GetActForItemQuery,
  GetActForItemQueryVariables
> {
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
  providedIn: "root",
})
export class GetActIdsGQL extends Apollo.Query<
  GetActIdsQuery,
  GetActIdsQueryVariables
> {
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
  providedIn: "root",
})
export class GetActForDetailsGQL extends Apollo.Query<
  GetActForDetailsQuery,
  GetActForDetailsQueryVariables
> {
  document = GetActForDetailsDocument;
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
  providedIn: "root",
})
export class GetHabitansOptionGQL extends Apollo.Query<
  GetHabitansOptionQuery,
  GetHabitansOptionQueryVariables
> {
  document = GetHabitansOptionDocument;
}
