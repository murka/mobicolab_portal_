import gql from "graphql-tag";

export const ReqForOptions = {
  document: gql`
    fragment ReqForOptions on Lab {
      id
      label
    }
  `,
};
