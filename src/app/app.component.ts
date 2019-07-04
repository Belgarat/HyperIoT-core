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

  registerForm = new FormGroup({
    nome: new FormControl(''),
    cognome: new FormControl(''),
    userName: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl(''),
    confPassword: new FormControl('')
  });

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService,
    private hUserService: HusersService,
    private permissionService: PermissionsService,
    private hProjectService: HprojectsService,
    private hDeviceService: HdevicesService,
    private hPacketService: HpacketsService,
    private rulesService: RulesService,
    // private roles:RolesService = new RolesService(httpClient,'/hyperiot/roles', this.config)
  ) {
    this.config = new Configuration(this.conf)
  }



  actualJWT: JWTLoginResponse;
  loginClass: string = 'loginClass';
  registerClass: string = 'registerClass';
  status: string = '-';
  statusReg: string = '-';

  conf: ConfigurationParameters = {
    apiKeys: { 'AUTHORIZATION': '' },
    username: '',
    password: '',
    accessToken: '',
    basePath: null,
    withCredentials: false
  }

  config: Configuration
  //OK
  login() {
    if (!this.profileForm.value.username || !this.profileForm.value.password) {
      this.profileForm.value.username = 'hadmin';
      this.profileForm.value.password = 'admin';
    }
    this.authService.login(this.profileForm.value.username, this.profileForm.value.password).subscribe(
      res => {
        this.actualJWT = <JWTLoginResponse>res;
        console.log(this.actualJWT)
        this.loginClass = 'loginClassOk';

        this.conf = {
          apiKeys: { 'AUTHORIZATION': 'JWT ' + this.actualJWT.token },
          username: this.profileForm.value.username,
          password: '',
          accessToken: '',
          basePath: null,
          withCredentials: false
        }

        this.config = new Configuration(this.conf)

        console.log(this.config)
      },
      err => { console.log(err.status); this.loginClass = 'loginClassError'; this.status = err.status }
    )
  }

  // user: HUser = {
  //   name: 'Gabriele',
  //   lastname: 'Losiczko',
  //   username: 'gabriele',
  //   email: 'gabriele.losiczko@acsoftware.it',
  //   password: 'Pippo_Pluto_123',
  //   passwordConfirm: 'Pippo_Pluto_123'
  // }

  user: HUser;
  //OK
  reg() {
    this.user = {
      name: this.registerForm.value.nome,
      lastname: this.registerForm.value.cognome,
      username: this.registerForm.value.userName,
      email: this.registerForm.value.mail,
      password: this.registerForm.value.password,
      passwordConfirm: this.registerForm.value.confPassword
    }

    this.hUserService.register(this.user).subscribe(
      res => { this.registerClass='registerClassOk'; },
      err => {
        console.log(err.status);
        this.registerClass='registerClassError';
      }
    )
  }
  //OK
  activate(act) {

    this.hUserService.activate(this.user.email, act).subscribe(
      res => { },
      err => {
        console.log(err.status)
      }
    )

  }

  

}
