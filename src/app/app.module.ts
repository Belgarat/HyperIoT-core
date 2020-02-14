import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from 'projects/core/src/lib/core.module';
import { AuthenticationService, Configuration, ConfigurationParameters } from 'projects/core/src/public_api';
import { ServiceTestComponent } from './test/service-test.component';

import { HUserClientModule, HyperiotClientModule } from '@hyperiot/core'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestIdbComponent } from './test-idb/test-idb.component';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    apiKeys: {},
    username: '',
    password: '',
    accessToken: ''
  }
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent,
    ServiceTestComponent,
    PageNotFoundComponent,
    TestIdbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HyperiotClientModule.forRoot(apiConfigFactory),
    //HUserClientModule.forRoot(apiConfigFactory),
    AppRoutingModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
