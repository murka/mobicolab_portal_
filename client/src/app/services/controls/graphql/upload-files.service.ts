import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable, FetchResult } from 'apollo-link';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  id: string;

  mutation = gql`
    mutation droppDoc($file: Upload!, $actId: String!, $name: String!) {
      droppDoc(file: $file, actId: $actId, name: $name) {
        id
      }
    }
  `

  constructor(private apollo: Apollo) { }

  droppDoc(file: File, actId: string, name: string) {
    return this.apollo.use('uploadFiles').mutate({
      mutation: this.mutation,
      variables: {
        file: file,
        actId: actId,
        name: name
      },
      optimisticResponse: {
        __typename: 'Mutation',
        droppDoc: {
          __typename: 'Doc',
          id: ''
        }
      }
    })
  }
}
