import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetsComponent } from './demo/widgets/widgets.component';
import { ServiceTestComponent } from './test/service-test.component';

const routes: Routes = [
  { path: 'widgets', component: WidgetsComponent },
  { path: 'services', component: ServiceTestComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
