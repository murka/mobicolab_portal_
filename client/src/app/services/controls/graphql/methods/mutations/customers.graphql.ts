import gql from "graphql-tag";

export class CreateCustomer {
  document = gql`
    mutation CreateCustomerThroughOption($data: CreateCustomerDto!) {
      createCustomer(createCustomerData: $data) {
        id
        label
      }
    }
  `;
}

export class PatchCustomer {
  document = gql`
    mutation PatchCustomerThroughOption($data: PatchCustomerDto!) {
      updateCustomer(updateCustomerData: $data) {
        id
        label
      }
    }
  `;
}
