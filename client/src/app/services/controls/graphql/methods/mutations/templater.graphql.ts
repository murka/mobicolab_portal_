import gql from "graphql-tag";

export class CreatePdf {
  document = gql`
    mutation CreatePdf($actId: String!, $path: String!) {
      createPdf(actId: $actId, path: $path) {
        id
      }
    }
  `;
}
