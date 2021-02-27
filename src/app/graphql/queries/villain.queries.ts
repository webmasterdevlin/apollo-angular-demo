import { gql } from "apollo-angular";

export const GET_VILLAINS_QUERY = gql`
  query get_villains {
    villains {
      id
      firstName
      lastName
      house
      knownAs
    }
  }
`;
