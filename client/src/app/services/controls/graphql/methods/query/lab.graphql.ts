import gql from "graphql-tag";
import { WholeLab } from "../fragments/lab.graphql";

export class getLabsForOption {
  document = gql`
    query getLabsForOption {
      getLabs {
        id
        label
      }
    }
  `;
}

export class getLab {
  document = gql`
    query getLab($data: String!) {
      getLab(id: $data) {
        ...WholeLab
      }
    }
    ${WholeLab.document}
  `;
}
