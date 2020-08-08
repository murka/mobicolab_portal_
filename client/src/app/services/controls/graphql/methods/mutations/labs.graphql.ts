import gql from "graphql-tag";
import { ReqForOptions } from "../fragments/options.graphql";

export class CreateLab {
  document = gql`
    mutation CreateLabThroughOption($data: CreateLabDto!) {
      createLab(createLabData: $data) {
        ...ReqForOptions
      }
    }
    ${ReqForOptions.document}
  `;
}

export class PatchLabThroughOption {
  document = gql`
    mutation PatchLabThroughOption($data: InsertLabDto!) {
      updateLab(insertLabData: $data) {
        ...ReqForOptions
      }
    }
    ${ReqForOptions.document}
  `;
}
