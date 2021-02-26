import { gql } from "apollo-angular";

export const GET_HEROES_QUERY = gql`
  query get_heroes {
    heroes {
      id
      firstName
      lastName
      house
      knownAs
    }
  }
`;
