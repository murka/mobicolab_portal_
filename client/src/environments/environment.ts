// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: "http://localhost:3000/api/",
  API_URI: "http://localhost:3010/nestapi/",
  GQL_URI: "http://localhost:2000/graphql",
  GQL_URI_UPLOAD_FILES: "http://localhost:3010/graphql",
  WS_URI_FILES: "ws://localhost:3060/graphql",
  URI: "http://192.168.64.8/api",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
