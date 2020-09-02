import gql from "graphql-tag";

export class CreateHabitan {
  document = gql`
    mutation CreateHabitan($data: String!) {
      createHabitan(label: $data) {
        id
        label
        htypes {
          id
          label
        }
      }
    }
  `;
}

export class CreateHType {
  document = gql`
    mutation CreateHType($data: CreateHTypeDto!) {
      createHabitansType(createHTypeData: $data) {
        id
        label
      }
    }
  `;
}

export class UpdateHabitan {
  document = gql`
    mutation UpdateHabitan($id: String!, $label: String!) {
      updateHabitan(id: $id, label: $label) {
        id
        label
        htypes {
          id
          label
        }
      }
    }
  `;
}

export class UpdateHType {
  document = gql`
    mutation UpdateHType($id: String!, $label: String!) {
      updateHabitansType(id: $id, label: $label) {
        id
        label
      }
    }
  `;
}
