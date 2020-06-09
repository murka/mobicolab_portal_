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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};



export type Act = {
   __typename?: 'Act';
  id: Scalars['ID'];
  docs?: Maybe<Array<Maybe<Doc>>>;
};

export type Doc = {
   __typename?: 'Doc';
  id: Scalars['ID'];
  act?: Maybe<Act>;
  events?: Maybe<Array<Maybe<DocEvent>>>;
  title?: Maybe<Scalars['String']>;
  ydUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  downloadable: Scalars['Boolean'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type DocEvent = {
   __typename?: 'DocEvent';
  id: Scalars['ID'];
  doc?: Maybe<Doc>;
  event?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type DocSubscriptionsPayload = {
   __typename?: 'DocSubscriptionsPayload';
  data: Doc;
  mutation: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  droppDoc: Doc;
  titlingDoc: Doc;
  savingDoc: Doc;
  savingAllDocs: Array<Doc>;
  removeDoc: Doc;
  deleteDoc: Doc;
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

export type Query = {
   __typename?: 'Query';
  docs: Array<Doc>;
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

export type Subscription = {
   __typename?: 'Subscription';
  changeDocs: DocSubscriptionsPayload;
};


export type SubscriptionChangeDocsArgs = {
  actId: Scalars['String'];
};

export type TitlingDocInput = {
  docId: Scalars['String'];
  title: Scalars['String'];
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
  & { docs: Array<(
    { __typename?: 'Doc' }
    & Pick<Doc, 'id' | 'title' | 'ydUrl' | 'name'>
  )> }
);

export type ChangeDocsSubscriptionVariables = {
  actId: Scalars['String'];
};


export type ChangeDocsSubscription = (
  { __typename?: 'Subscription' }
  & { changeDocs: (
    { __typename?: 'DocSubscriptionsPayload' }
    & Pick<DocSubscriptionsPayload, 'mutation'>
    & { data: (
      { __typename?: 'Doc' }
      & Pick<Doc, 'id' | 'name' | 'ydUrl' | 'title' | 'downloadable'>
    ) }
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
  docs(actId: $actId) {
    id
    title
    ydUrl
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllDocsGQL extends Apollo.Query<GetAllDocsQuery, GetAllDocsQueryVariables> {
    document = GetAllDocsDocument;
    
  }
export const ChangeDocsDocument = gql`
    subscription changeDocs($actId: String!) {
  changeDocs(actId: $actId) {
    mutation
    data {
      id
      name
      ydUrl
      title
      downloadable
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ChangeDocsGQL extends Apollo.Subscription<ChangeDocsSubscription, ChangeDocsSubscriptionVariables> {
    document = ChangeDocsDocument;
    
  }