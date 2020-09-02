import gql from "graphql-tag";

export class PostAct {
  document = gql`
    mutation PostAct($data: NewActDto!) {
      createAct(newActData: $data) {
        id
        name
      }
    }
  `;
}

export class PatchAct {
  document = gql`
    mutation PatchAct($data: PatchActDto!) {
      updateAct(updateActData: $data) {
        id
        name
      }
    }
  `;
}
