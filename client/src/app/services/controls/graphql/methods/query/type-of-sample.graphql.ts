import gql from "graphql-tag";

export class getHabitansOption {
  document = gql`
    query getHabitansOption {
      getAllHabitans {
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
