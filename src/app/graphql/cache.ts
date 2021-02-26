// TODO: NOT COMPLETED

import { InMemoryCache, makeVar } from "@apollo/client";

import { Hero } from "../features/hero/containers/heroes/hero.model";

const initialState: Hero[] = [
  { id: "", house: "", lastName: "", firstName: "", knownAs: "" },
];

const heroesVar = makeVar<Hero[]>(initialState);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        heroes: {
          read() {
            return heroesVar;
          },
        },
      },
    },
  },
});
