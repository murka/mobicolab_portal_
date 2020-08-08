import gql from "graphql-tag";

export const WholeLab = {
  document: gql`
    fragment WholeLab on Lab {
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
