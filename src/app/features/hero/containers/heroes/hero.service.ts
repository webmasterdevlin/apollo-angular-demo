import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Hero } from "./hero.model";
import { GET_HEROES_QUERY } from "../../../../graphql/queries/hero.queries";
import { untilDestroyed } from "@ngneat/until-destroy";
import { catchError, finalize, tap } from "rxjs/operators";
import { of } from "rxjs";
import {
  ADD_HERO,
  DELETE_A_HERO,
  UPDATE_HERO,
} from "../../../../graphql/mutations/hero.mutations";

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
