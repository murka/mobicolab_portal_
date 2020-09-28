import gql from "graphql-tag";

export class DroppDoc {
  document = gql`
    mutation DroppDoc($actId: String!, $name: String!, $mimetype: String!) {
      droppDoc(actId: $actId, name: $name, mimetype: $mimetype) {
        id
      }
    }
  `;
}

export class TitlingDoc {
  document = gql`
    mutation titlingDoc($data: TitlingDocInput!) {
      titlingDoc(titlingDocData: $data) {
        title
      }
    }
  `;
}

export class RemoveDoc {
  document = gql`
    mutation removeDoc($docId: String!) {
      removeDoc(docId: $docId) {
        id
      }
    }
  `;
}
