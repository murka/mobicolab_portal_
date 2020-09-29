import gql from "graphql-tag";
import { WholeAct } from "../fragments/act.graphql";

export class getAllActs {
  document = gql`
    query getAllActs {
      getActs {
        id
        name
        customer {
          id
          label
        }
        generalCustomer {
          id
          label
        }
        lab {
          id
          label
        }
        datetime {
          date
          time
        }
        docs {
          id
          title
          ydUrl
          name
        }
      }
    }
  `;
}

export class getWholeAct {
  document = gql`
    query getWholeAct($id: String!) {
      getAct(id: $id) {
        ...WholeAct
      }
    }
    ${WholeAct}
  `;
}
