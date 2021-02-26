import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Hero } from "./hero.model";
import {
  GET_HEROES_QUERY,
  GET_HEROES_QUERY_CLIENT,
} from "src/app/graphql/queries/hero.queries";
import {
  ADD_HERO,
  DELETE_A_HERO,
  UPDATE_HERO,
} from "src/app/graphql/mutations/hero.mutations";

@Injectable({
  providedIn: "root",
})
export class HeroService {
  constructor(private apollo: Apollo) {}

  getHeroesQuery() {
    return this.apollo.watchQuery<{ heroes: Hero[] }>({
      query: GET_HEROES_QUERY,
    }).valueChanges;
  }

  getHeroesQueryClient() {
    return this.apollo.watchQuery<{ heroes: Hero[] }>({
      query: GET_HEROES_QUERY_CLIENT,
    }).valueChanges;
  }

  deleteHeroMutate(id: string) {
    return this.apollo.mutate<void>({
      mutation: DELETE_A_HERO,
      variables: {
        id: id,
      },
    });
  }

  addHeroMutate(hero: Hero) {
    return this.apollo.mutate<{
      insert_heroes: {
        returning: Array<Hero>;
      };
    }>({
      mutation: ADD_HERO,
      variables: {
        ...hero,
      },
    });
  }

  updateHeroMutate(hero: Hero) {
    return this.apollo.mutate<any>({
      mutation: UPDATE_HERO,
      variables: {
        ...hero,
      },
    });
  }
}
