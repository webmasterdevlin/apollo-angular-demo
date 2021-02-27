import { NgModule } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpLink } from "apollo-angular/http";
import { ApolloClientOptions, ApolloLink } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { HttpHeaders } from "@angular/common/http";
import { cache } from "./cache";
import { APOLLO_OPTIONS } from "apollo-angular";
import { HeroService } from "../features/hero/containers/heroes/hero.service";
import { VillainService } from "../features/villain/containers/villains/villain.service";

const uri = environment.graphqlEndpoint;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: new HttpHeaders().set(
      "x-hasura-admin-secret",
      environment.hasuraKey
    ),
  }));

  const link = ApolloLink.from([basic, httpLink.create({ uri })]);

  return {
    link,
    cache,
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    HeroService,
    VillainService,
  ],
})
export class GraphQLModule {}
