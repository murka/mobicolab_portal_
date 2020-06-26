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
};



export type Doc = {
   __typename?: 'Doc';
  id: Scalars['ID'];
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

export type Query = {
   __typename?: 'Query';
  first: Doc;
};

export type Subscription = {
   __typename?: 'Subscription';
  changeDocs: DocSubscriptionsPayload;
};


export type SubscriptionChangeDocsArgs = {
  actId: Scalars['String'];
};

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