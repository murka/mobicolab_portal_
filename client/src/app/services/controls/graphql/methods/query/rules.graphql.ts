import gql from "graphql-tag";

export class getGeneratePath {
  document = gql`
    query getGeneratePath($labId: String!, $typeId: String!) {
      getLabTypeOfSampleTemplate(labId: $labId, typeId: $typeId) {
        path
      }
    }
  `;
}
