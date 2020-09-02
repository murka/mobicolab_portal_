import gql from "graphql-tag";

export class CreateLabTOSRule {
  document = gql`
    mutation CreateLabTOSRule($data: NewLabTypeOfSampleTemplate!) {
      createLabTypeOfSampleTemplate(newLabTypeOfSampleTemplateData: $data) {
        path
      }
    }
  `;
}

export class UpdateLabTOSRule {
  document = gql`
    mutation UpdateLabTOSRule($data: NewLabTypeOfSampleTemplate!) {
      updateLabTypeOfSampleTemplate(patchLabTypeOfSampleTemplateData: $data) {
        path
      }
    }
  `;
}
