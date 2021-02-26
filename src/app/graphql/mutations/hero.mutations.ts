import { gql } from "apollo-angular";

export const DELETE_A_HERO = gql`
  mutation delete_a_hero($id: uuid!) {
    delete_heroes(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

export const ADD_HERO = gql`
  mutation add_hero(
    $firstName: String
    $lastName: String
    $house: String
    $knownAs: String
  ) {
    insert_heroes(
      objects: {
        firstName: $firstName
        lastName: $lastName
        house: $house
        knownAs: $knownAs
      }
    ) {
      returning {
        id
        firstName
        lastName
        house
        knownAs
      }
    }
  }
`;

export const UPDATE_HERO = gql`
  mutation update_hero(
    $id: uuid!
    $firstName: String
    $lastName: String
    $house: String
    $knownAs: String
  ) {
    update_heroes(
      where: { id: { _eq: $id } }
      _set: {
        firstName: $firstName
        lastName: $lastName
        house: $house
        knownAs: $knownAs
      }
    ) {
      affected_rows
    }
  }
`;
