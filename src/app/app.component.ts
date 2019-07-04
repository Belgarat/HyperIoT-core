import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Configuration, ConfigurationParameters, AuthenticationService, JWTLoginResponse, HusersService, HUser, RolesService, Role, PermissionsService, Permission, HprojectsService, HProject, HdevicesService, HDevice, HpacketsService, HPacket, HPacketField, Rule, RulesService } from 'projects/core/src/public_api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(){

  }

}
