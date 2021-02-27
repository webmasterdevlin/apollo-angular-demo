import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Villain } from "./villain.model";
import { GET_VILLAINS_QUERY } from "src/app/graphql/queries/villain.queries";
import {
  ADD_VILLAIN,
  DELETE_A_VILLAIN,
  UPDATE_VILLAIN,
} from "src/app/graphql/mutations/villain.mutations";
import { cache } from "src/app/graphql/cache";

@Injectable()
export class VillainService {
  constructor(private apollo: Apollo) {}

  getVillainsQuery() {
    return this.apollo.watchQuery<{ villains: Villain[] }>({
      query: GET_VILLAINS_QUERY,
      fetchPolicy: "network-only",
    }).valueChanges;
  }

  deleteVillainMutate(id: string) {
    return this.apollo.mutate<void>({
      mutation: DELETE_A_VILLAIN,
      variables: {
        id: id,
      },
      optimisticResponse: {} as any,
      update: (cache) => {
        const appCache = cache.readQuery<{ villains: Villain[] }>({
          query: GET_VILLAINS_QUERY,
        });
        const newVillains = appCache.villains.filter((v) => v.id != id);
        cache.writeQuery({
          query: GET_VILLAINS_QUERY,
          data: { villains: newVillains },
        });
      },
    });
  }

  addVillainMutate(villain: Villain) {
    return this.apollo.mutate<{
      insert_villains: {
        returning: Array<Villain>;
      };
    }>({
      mutation: ADD_VILLAIN,
      variables: {
        ...villain,
      },
      update: (cache, result) => {
        const appCache = cache.readQuery<{ villains: Villain[] }>({
          query: GET_VILLAINS_QUERY,
        });
        const newVillain = result.data.insert_villains.returning[0];
        cache.writeQuery({
          query: GET_VILLAINS_QUERY,
          data: { villains: [...appCache.villains, newVillain] },
        });
      },
    });
  }

  updateVillainMutate(villain: Villain) {
    return this.apollo.mutate<any>({
      mutation: UPDATE_VILLAIN,
      variables: {
        ...villain,
      },
      update: (cache) => {
        const appCache = cache.readQuery<{ villains: Villain[] }>({
          query: GET_VILLAINS_QUERY,
        });
        const newVillains = appCache.villains.map((v) =>
          v.id === villain.id ? villain : v
        );
        cache.writeQuery({
          query: GET_VILLAINS_QUERY,
          data: { villains: newVillains },
        });
      },
    });
  }

  softDeleteVillainMutate(id: string) {
    const appCache = cache.readQuery<{ villains: Villain[] }>({
      query: GET_VILLAINS_QUERY,
    });
    const newVillains = appCache.villains.filter((h) => h.id != id);
    cache.writeQuery({
      query: GET_VILLAINS_QUERY,
      data: { villains: newVillains },
    });
  }
}
