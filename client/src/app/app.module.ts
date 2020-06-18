import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ApolloFilesModule } from './shared/apollo/apollo-files.module'

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import { ActControlService } from './services/controls/act-control.service';
import { CustomerControlService } from './services/controls/customer-control.service';
import { GeneralCustomerControlService } from './services/controls/general-custromer-control.service';
import { LabsControlService } from './services/controls/labs-control.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';

import { environment } from '../environments/environment';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';
import { split } from 'apollo-link';
import { getMainDefinition } from "apollo-utilities";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    // ApolloFilesModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot(),
    // HttpClientModule,
    // ApolloModule,
    // HttpLinkModule,
    ApolloFilesModule
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [
    ActControlService,
    CustomerControlService,
    GeneralCustomerControlService,
    LabsControlService,
    ProcessHTTPMsgService,
    { provide: 'BaseURL', useValue: environment.baseURL},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(apollo: Apollo, httpLink: HttpLink) {
  //   const http = createUploadLink({ uri: environment.GQL_URI });

  //   const ws = new WebSocketLink({
  //     uri: environment.WS_URI,
  //     options: {
  //       reconnect: true,
  //     },
  //   });

  //   const link = split(
  //     //split based on operation type
  //     ({ query }) => {
  //       let definition = getMainDefinition(query);
  //       return (
  //         definition.kind === "OperationDefinition" &&
  //         definition.operation === "subscription"
  //       );
  //     },
  //     ws,
  //     http
  //   );

  //   apollo.createNamed("files", { link: link, cache: new InMemoryCache() });
  // }
 }
