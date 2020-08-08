import gql from "graphql-tag";

export class getAllDocs {
  document = gql`
    query getAllDocs($actId: String!) {
      getAct(id: $actId) {
        id
        docs {
          id
          name
          ydUrl
        }
      }
    }
  `;
}

export class getActForItem {
  document = gql`
    query getActForItem {
      getActs {
        id
        name
        status
        lab {
          label
        }
      }
    }
  `;
}

export class getActIds {
  document = gql`
    query getActIds {
      getActs {
        id
      }
    }
  `;
}

export class getActForDetails {
  document = gql`
    query getActForDetails($actId: String!) {
      getAct(id: $actId) {
        id
        name
      }
    }
  `;
}
