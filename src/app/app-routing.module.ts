import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceTestComponent } from './test/service-test.component';
import { WidgetsLayoutComponent } from './dashboard/widgets-layout/widgets-layout.component';

const routes: Routes = [
  { path: 'widgets', component: WidgetsLayoutComponent },
  { path: 'services', component: ServiceTestComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
