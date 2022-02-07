import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceTestComponent } from './test/service-test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestIdbComponent } from './test-idb/test-idb.component';

const routes: Routes = [
  { path: 'services', component: ServiceTestComponent },
  { path: 'idb', component: TestIdbComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
