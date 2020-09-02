import gql from "graphql-tag";

export const ChangeDocs = gql`
  subscription changeDocs($actId: String!) {
    changeDocs(actId: $actId) {
      id
      name
      ydUrl
      title
    }
  }
`;

export class getAllDocs {
  document = gql`
    query getAllDocs($actId: String!) {
      getDocs(id: $actId) {
        id
        name
        ydUrl
        title
      }
    }
  `;
}
