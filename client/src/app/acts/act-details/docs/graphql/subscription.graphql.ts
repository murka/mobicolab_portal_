import gql from "graphql-tag";

export const ChangeDocs = gql`
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
