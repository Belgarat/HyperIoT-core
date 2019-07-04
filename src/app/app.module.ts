import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GridsterModule } from 'angular-gridster2';

import { CoreModule } from 'projects/core/src/lib/core.module';
import { HyperiotBaseModule, PlotlyModule } from 'projects/core/src/lib/hyperiot-base/hyperiot-base.module';
import { AuthenticationService } from 'projects/core/src/public_api';
import { ServiceTestComponent } from './test/service-test.component';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WidgetsComponent } from './demo/widgets/widgets.component';
import { AreaChartComponent } from './widgets/area-chart/area-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetsComponent,
    AreaChartComponent,
    ServiceTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    GridsterModule,
    AppRoutingModule,
    CoreModule,
    HyperiotBaseModule,
    PlotlyModule
  ],
  providers: [ AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
