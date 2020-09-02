import gql from "graphql-tag";

export const WholeApplication = {
  document: gql`
    fragment WholeApplication on Application {
      id
      place
      datetime {
        date
        time
      }
    }
  `,
};
