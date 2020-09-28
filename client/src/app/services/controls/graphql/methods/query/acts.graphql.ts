import gql from "graphql-tag";

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
