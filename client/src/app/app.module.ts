import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { GraphQLModule } from './shared/graphql/graphql.module';

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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    GraphQLModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot()
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
export class AppModule { }
