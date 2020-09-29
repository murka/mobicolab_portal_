import gql from "graphql-tag";
import { WholeAct } from "../fragments/act.graphql";

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
        typeOfSample {
          habitan {
            id
          }
        }
        lab {
          id
        }
      }
    }
  `;
}
