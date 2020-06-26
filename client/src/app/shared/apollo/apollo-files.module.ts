import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLink, HttpLinkModule } from "apollo-angular-link-http";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import { environment } from "src/environments/environment";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SubscriptionClient } from 'subscriptions-transport-ws';


@NgModule({
  imports: [CommonModule, HttpClientModule, ApolloModule, HttpLinkModule],
})
export class ApolloFilesModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const http = httpLink.create({ uri: environment.GQL_URI })

    const uploadLink = createUploadLink({ uri: environment.GQL_URI_UPLOAD_FILES })

    const client = new SubscriptionClient(environment.WS_URI_FILES, {
      reconnect: true
    })

    const link = new WebSocketLink(client)

    apollo.create({link: link, cache: new InMemoryCache()}, 'filesWS')
    apollo.create({ link:  uploadLink, cache: new InMemoryCache()}, 'uploadFiles')
    apollo.create({link: http, cache: new InMemoryCache()})
  }
}
