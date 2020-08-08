import gql from "graphql-tag";

export const WholeGeneralCustomer = {
  document: gql`
    fragment WholeGeneralCustomer on GeneralCustomer {
      id
      fullname
      label
      address {
        zip
        country
        region
        city
        street
        building
        room
      }
      tel
      email
    }
  `,
};
