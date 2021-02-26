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

export const GET_HEROES_QUERY_CLIENT = gql`
  query get_heroes {
    heroes @client {
      id
      firstName
      lastName
      house
      knownAs
    }
  }
`;
