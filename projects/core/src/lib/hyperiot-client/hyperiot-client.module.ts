import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationClientModule } from './authentication-client/authentication-client.module'

@NgModule({
  declarations: [],
  imports: [
    AuthenticationClientModule,
    CommonModule
  ]
})
export class HyperiotClientModule { }
