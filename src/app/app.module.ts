import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule, HyperiotBaseModule, PlotlyModule } from '@hyperiot/core';
import { AuthenticationService } from 'projects/core/src/public_api';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WidgetsComponent } from './demo/widgets/widgets.component';
import { AreaChartComponent } from './widgets/area-chart/area-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetsComponent,
    AreaChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    HyperiotBaseModule,
    PlotlyModule
  ],
  providers: [ AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
