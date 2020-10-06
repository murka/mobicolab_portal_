import gql from "graphql-tag";

export class getFileDownloadLink {
  document = gql`
    query getFileDownloadLink($id: String!) {
      getFileDownloadLink(docId: $id)
    }
  `;
}
