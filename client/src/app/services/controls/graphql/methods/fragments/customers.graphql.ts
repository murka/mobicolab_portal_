import gql from "graphql-tag";

export const WholeCustomer = {
  document: gql`
    fragment WholeCustomer on Customer {
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
