import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GridsterModule } from 'angular-gridster2';
import { DynamicModule } from 'ng-dynamic-component';

import { CoreModule } from 'projects/core/src/lib/core.module';
import { HyperiotBaseModule, PlotlyModule } from 'projects/core/src/lib/hyperiot-base/hyperiot-base.module';
import { AuthenticationService } from 'projects/core/src/public_api';
import { ServiceTestComponent } from './test/service-test.component';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardConfigService } from './dashboard/dashboard-config.service';
import { WidgetsLayoutComponent } from './dashboard/widgets-layout/widgets-layout.component';
import { AreaChartComponent } from './widgets/area-chart/area-chart.component';
import { DynamicWidgetComponent } from './widgets/dynamic-widget/dynamic-widget.component';
import { EventsLogComponent } from './widgets/events-log/events-log.component';
import { HelloWorldComponent } from './widgets/hello-world/hello-world.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetsLayoutComponent,
    AreaChartComponent,
    ServiceTestComponent,
    DynamicWidgetComponent,
    EventsLogComponent,
    HelloWorldComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    GridsterModule,
    DynamicModule.withComponents([
      AreaChartComponent,
      EventsLogComponent,
      HelloWorldComponent,
    ]),
    PlotlyModule,
    CoreModule,
    HyperiotBaseModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService, DashboardConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
