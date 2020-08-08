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

export class getCustomer {
  document = gql`
    query getCustomer($data: String!) {
      customer(id: $data) {
        ...WholeCustomer
      }
    }
    ${WholeCustomer.document}
  `;
}
