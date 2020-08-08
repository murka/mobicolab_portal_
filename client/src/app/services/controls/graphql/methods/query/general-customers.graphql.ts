import gql from "graphql-tag";
import { WholeGeneralCustomer } from "../fragments/general-customers.graphql";

export class getGeneralCustomersForOption {
  document = gql`
    query getGeneralCustomersForOption {
      getGeneralCustomers {
        id
        label
      }
    }
  `;
}

export class getGeneralCustomer {
  document = gql`
    query getGeneralCustomer($data: String!) {
      getGeneralCustomer(id: $data) {
        ...WholeGeneralCustomer
      }
    }
    ${WholeGeneralCustomer.document}
  `;
}
