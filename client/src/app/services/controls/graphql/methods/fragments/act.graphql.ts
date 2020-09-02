import gql from "graphql-tag";

export const WholeAct = {
  document: gql`
    fragment WholeAct on Act {
      id
      name
      customer {
        id
      }
      generalCustomer {
        id
      }
      lab {
        id
      }
      typeOfSample {
        habitan {
          id
        }
        htype {
          id
        }
      }
      objectName
      place
      datetime {
        date
        time
      }
      method
      toolType
      climaticEnvironmental
      planning
      normativeDocument
      sampleType
      sample
      preparation
      goal
      definedIndicators
      additions
      informationAboutSelection
      environmentalEngineer
      representative
      passedSample
      status
      applications {
        id
        place
        datetime {
          date
          time
        }
      }
    }
  `,
};
