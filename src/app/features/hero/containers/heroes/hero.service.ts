import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Hero } from "./hero.model";
import { GET_HEROES_QUERY } from "src/app/graphql/queries/hero.queries";
import {
  ADD_HERO,
  DELETE_A_HERO,
  UPDATE_HERO,
} from "src/app/graphql/mutations/hero.mutations";
import { cache } from "src/app/graphql/cache";

@Injectable()
export class HeroService {
  constructor(private apollo: Apollo) {}

  getHeroesQuery() {
    return this.apollo.watchQuery<{ heroes: Hero[] }>({
      query: GET_HEROES_QUERY,
      fetchPolicy: "network-only",
    }).valueChanges;
  }

  deleteHeroMutate(id: string) {
    return this.apollo.mutate<void>({
      mutation: DELETE_A_HERO,
      variables: {
        id: id,
      },
      optimisticResponse: {} as any,
      update: (cache) => {
        const appCache = cache.readQuery<{ heroes: Hero[] }>({
          query: GET_HEROES_QUERY,
        });
        const newHeroes = appCache.heroes.filter((h) => h.id != id);
        cache.writeQuery({
          query: GET_HEROES_QUERY,
          data: { heroes: newHeroes },
        });
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
      update: (cache, result) => {
        const appCache = cache.readQuery<{ heroes: Hero[] }>({
          query: GET_HEROES_QUERY,
        });
        const newHero = result.data.insert_heroes.returning[0];
        cache.writeQuery({
          query: GET_HEROES_QUERY,
          data: { heroes: [...appCache.heroes, newHero] },
        });
      },
    });
  }

  updateHeroMutate(hero: Hero) {
    return this.apollo.mutate<any>({
      mutation: UPDATE_HERO,
      variables: {
        ...hero,
      },
      update: (cache) => {
        const appCache = cache.readQuery<{ heroes: Hero[] }>({
          query: GET_HEROES_QUERY,
        });
        const newHeroes = appCache.heroes.map((h) =>
          h.id === hero.id ? hero : h
        );
        cache.writeQuery({
          query: GET_HEROES_QUERY,
          data: { heroes: newHeroes },
        });
      },
    });
  }

  softDeleteHeroMutate(id: string) {
    const appCache = cache.readQuery<{ heroes: Hero[] }>({
      query: GET_HEROES_QUERY,
    });
    const newHeroes = appCache.heroes.filter((h) => h.id != id);
    cache.writeQuery({
      query: GET_HEROES_QUERY,
      data: { heroes: newHeroes },
    });
  }
}
