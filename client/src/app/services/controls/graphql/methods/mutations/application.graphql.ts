import gql from "graphql-tag";
import { WholeApplication } from "../fragments/application.graphql";

export class CreateApp {
  document = gql`
    mutation CreatApp {
      createApplication {
        id
      }
    }
  `;
}

export class CreateAppCopy {
  document = gql`
    mutation CreateAppCopy($data: CopyAppDto!) {
      createAppCopy(copyAppData: $data) {
        ...WholeApplication
      }
    }
    ${WholeApplication.document}
  `;
}

export class DeleteApp {
  document = gql`
    mutation DeleteApp($data: String!) {
      deleteApplication(id: $data) {
        id
      }
    }
  `;
}
