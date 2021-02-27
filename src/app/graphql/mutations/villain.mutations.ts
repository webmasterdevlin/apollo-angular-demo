import { gql } from "apollo-angular";

export const DELETE_A_VILLAIN = gql`
  mutation delete_a_villain($id: uuid!) {
    delete_villains(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

export const ADD_VILLAIN = gql`
  mutation add_villain(
    $firstName: String
    $lastName: String
    $house: String
    $knownAs: String
  ) {
    insert_villains(
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

export const UPDATE_VILLAIN = gql`
  mutation update_villain(
    $id: uuid!
    $firstName: String
    $lastName: String
    $house: String
    $knownAs: String
  ) {
    update_villains(
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
