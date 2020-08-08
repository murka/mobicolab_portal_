import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLink, HttpLinkModule } from "apollo-angular-link-http";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import { environment } from "src/environments/environment";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { onError } from "apollo-link-error";

@NgModule({
  imports: [CommonModule, HttpClientModule, ApolloModule, HttpLinkModule],
})
export class ApolloFilesModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const http = httpLink.create({ uri: environment.GQL_URI });

    const uploadLink = createUploadLink({
      uri: environment.GQL_URI_UPLOAD_FILES,
    });

    const client = new SubscriptionClient(environment.WS_URI_FILES, {
      reconnect: true,
    });

    const link = new WebSocketLink(client);

    const linkEr = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );

      if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    apollo.create({ link: link, cache: new InMemoryCache() }, "filesWS");
    apollo.create(
      { link: uploadLink, cache: new InMemoryCache() },
      "uploadFiles"
    );
    apollo.create({ link: http, cache: new InMemoryCache() });
    apollo.create({ link: linkEr, cache: new InMemoryCache() });
  }
}
