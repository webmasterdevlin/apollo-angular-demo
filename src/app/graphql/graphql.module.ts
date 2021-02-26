import { NgModule } from "@angular/core";
import { APOLLO_OPTIONS } from "apollo-angular";
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client/core";
import { HttpLink } from "apollo-angular/http";
import { setContext } from "@apollo/client/link/context";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

const uri = environment.graphqlEndpoint;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: new HttpHeaders().set(
      "x-hasura-admin-secret",
      environment.hasuraKey
    ),
  }));

  const link = ApolloLink.from([basic, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

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
  ],
})
export class GraphQLModule {}
