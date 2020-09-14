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
};



export type Doc = {
  __typename?: 'Doc';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  ydUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  downloadable?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getDocs?: Maybe<Array<Doc>>;
};


export type QueryGetDocsArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  changeDocs: Doc;
};


export type SubscriptionChangeDocsArgs = {
  actId: Scalars['String'];
};

export type ChangeDocsSubscriptionVariables = Exact<{
  actId: Scalars['String'];
}>;


export type ChangeDocsSubscription = (
  { __typename?: 'Subscription' }
  & { changeDocs: (
    { __typename?: 'Doc' }
    & Pick<Doc, 'id' | 'name' | 'ydUrl' | 'title'>
  ) }
);

export type GetAllDocsQueryVariables = Exact<{
  actId: Scalars['String'];
}>;


export type GetAllDocsQuery = (
  { __typename?: 'Query' }
  & { getDocs?: Maybe<Array<(
    { __typename?: 'Doc' }
    & Pick<Doc, 'id' | 'name' | 'ydUrl' | 'title'>
  )>> }
);

export const ChangeDocsDocument = gql`
    subscription changeDocs($actId: String!) {
  changeDocs(actId: $actId) {
    id
    name
    ydUrl
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ChangeDocsGQL extends Apollo.Subscription<ChangeDocsSubscription, ChangeDocsSubscriptionVariables> {
    document = ChangeDocsDocument;
    
  }
export const GetAllDocsDocument = gql`
    query getAllDocs($actId: String!) {
  getDocs(id: $actId) {
    id
    name
    ydUrl
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllDocsGQL extends Apollo.Query<GetAllDocsQuery, GetAllDocsQueryVariables> {
    document = GetAllDocsDocument;
    
  }