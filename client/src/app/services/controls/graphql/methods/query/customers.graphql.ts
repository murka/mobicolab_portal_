import gql from "graphql-tag";
import { WholeCustomer } from "../fragments/customers.graphql";

export class getCustomersForOption {
  document = gql`
    query getCustomersForOption {
      getCustomers {
        id
        label
      }
    }
  `;
}

export class getWholeCustomer {
  document = gql`
    query getWholeCustomer($data: String!) {
      customer(id: $data) {
        ...WholeCustomer
      }
    }
    ${WholeCustomer.document}
  `;
}

export class getCustomersWithActs {
  document = gql`
    query getCustomersWithActs {
      getCustomers {
        id
        label
        acts {
          id
          name
          datetime {
            date
          }
          lab {
            id
            label
          }
        }
      }
    }
  `;
}
