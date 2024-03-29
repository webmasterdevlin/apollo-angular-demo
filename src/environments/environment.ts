// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* your own hasura key and this should be kept in a server's environment variables */
export const environment = {
  production: false,
  graphqlEndpoint: "https://heroes.hasura.app/v1/graphql",
  hasuraKey: "XHV3J9uopfA6mD7MKA9hyDI2vxvWcc0BytF2u64GwnxwKwd3GsaZCrfc0sde03oR",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
