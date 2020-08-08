import gql from "graphql-tag";

export class CreateGeneralCustomer {
  document = gql`
    mutation CreateGeneralCustomerThroughOption(
      $data: CreateGeneralCustomerDto!
    ) {
      createGeneralCustomer(createGeneralCustomerData: $data) {
        id
        label
      }
    }
  `;
}

export class PatchGeneralCustomerThroughOption {
  document = gql`
    mutation PatchGeneralCustomerThroughOption(
      $data: InsertGeneralCustomerDto!
    ) {
      updateGeneralCustomer(insertGeneralCustomerData: $data) {
        id
        label
      }
    }
  `;
}
