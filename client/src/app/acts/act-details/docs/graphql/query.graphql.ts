import gql from "graphql-tag";

export class getAllDocs {
  document = gql`
    query getAllDocs($actId: String!) {
      docs(actId: $actId) {
        id
        title
        ydUrl
        name
      }
    }
  `;
}

// export const DOCS_QUERY = gql`
//   query getAllDocs($actId: String!) {
//     docs(actId: $actId) {
//       id
//       title
//       ydUrl
//       name
//     }
//   }
// `;
