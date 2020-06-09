import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink, HttpLinkModule } from "apollo-angular-link-http";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import { environment } from "src/environments/environment";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";

//create provider for dependency factory
export function provideApollo(httpLink: HttpLink) {
  // Create an http link:
  const http = createUploadLink({ uri: environment.GQL_URI })

  // Create a WebSocket link:
  const ws = new WebSocketLink({
    uri: environment.WS_URI,
    options: {
      reconnect: true,
    },
  });

  //using the ability to split links, we send data to each link
  //depending on what kind of operation is being sent
  const link = split(
    //split based on operation type
    ({ query }) => {
      let definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    ws,
    http
  );

  //create cache endpoint
  const cache = new InMemoryCache();

  //returning our links for apollo client
  return { link, cache };
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      //now we can use our provider function here
      useFactory: provideApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
