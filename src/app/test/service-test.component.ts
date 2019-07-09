import { Component, OnInit, Input } from '@angular/core';
import { Configuration, MailTemplate, MailtemplatesService, ConfigurationParameters, AuthenticationService, JWTLoginResponse, HusersService, HUser, RolesService, Role, PermissionsService, Permission, HprojectsService, HProject, HdevicesService, HDevice, HpacketsService, HPacket, HPacketField, Rule, RulesService, HUserPasswordReset } from 'projects/core/src/public_api';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.css']
})
export class ServiceTestComponent {

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

  whoAmI(){
    this.authService.whoAmI().subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }

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

  //OK
  moduleStatus(){
    this.hUserService.checkModuleWorking().subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }

  //OK
  recoveryRequest(mail:string){
    this.hUserService.resetPasswordRequest(mail).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }

  //OK
  resetPassword(codeRecovery:string, mail:string){
    var pwdRest:HUserPasswordReset={
      password:'M0entane0$',
      passwordConfirm:'M0entane0$',
      email:mail,
      resetCode:codeRecovery    
    }

    this.hUserService.resetPassword(pwdRest).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }

  //OK
  changePassword(){
    var hUserService: HusersService = new HusersService(this.httpClient, null, this.config);

    hUserService.changeHUserPassword(39, 'M0entane0$', 'S1eadlf!','S1eadlf!').subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }

  updateUser(){
    var hUserService: HusersService = new HusersService(this.httpClient, null, this.config);

    var user:HUser = {
      categoryIds: null,
      email: "gabriele.losiczko@acsoftware.it",
      id: 39,
      lastname: "Losiczko",
      name: "Gregorio", 
      tagIds: null,
      username: "gabriele",
    }
    // var user = this.userList.find(x=>x.id==39);
    // console.log(user)
    // user.password = 'S1eadlf!'
    user.active = false;

    hUserService.updateHUser(user).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }

  deleteHUser(){
    var hUserService: HusersService = new HusersService(this.httpClient, null, this.config);

    hUserService.deleteHUser(-3).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }

  role: Role;
  //OK
  addRole() {
    var rolesService: RolesService = new RolesService(this.httpClient, '/hyperiot/roles', this.config);

    this.role = {
      name: 'DefaultRole 3',
      description: 'Default user role 3'
    };

    rolesService.saveRole(this.role).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //OK
  addDefaultRole() {
    var rolesService: RolesService = new RolesService(this.httpClient, '/hyperiot/roles', this.config);

    var roleId = 40;
    var userId = this.userList.find(x => x.username == 'gabriele').id;

    rolesService.saveUserRole(roleId, userId).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //OK
  deleteRole(){
    var rolesService: RolesService = new RolesService(this.httpClient, '/hyperiot/roles', this.config);

    rolesService.deleteRole(6).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //OK 'actionIds' should be required in Permission interface
  grant() {
    var permissionService: PermissionsService = new PermissionsService(this.httpClient, null, this.config);

    var permission: Permission = {
      name: 'Prova permission',
      actionIds: 128,
      entityResourceName: 'it.acsoftware.hyperiot.hproject.model.HProject',
      role: this.roleList.find(x => x.name == 'DefaultRole 3')
    }
    console.log(permission)

    permissionService.savePermission(permission).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //OK
  addUserProject() {
    var hProjectService: HprojectsService = new HprojectsService(this.httpClient, null, this.config);

    var use:HUser = this.userList.find(x=>x.username=='giovanni')
    console.log(use)

    var hProject: HProject = {
      categoryIds: [],
      tagIds: [],
      name: 'Luke Project',
      description: 'Progetto arduino test',
      user:use
    }
    hProjectService.saveHProject(hProject).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //OK mancano 'password' e 'passwordConfirm' in hDevice 
  addUserDevice() {
    var hDeviceService: HdevicesService = new HdevicesService(this.httpClient, null, this.config);

    var hDevice: HDevice = {
      deviceName: 'Arduino',
      brand: 'ACS',
      model: 'ESP8266 NODE MCU',
      firmwareVersion: '1.0.0',
      softwareVersion: '1.0.0',
      description: 'WiFi Development Board co',
      password: 'passwordPass/007',
      passwordConfirm: 'passwordPass/007',
      project: this.projectList.find(x => x.name == 'Luke Project')
    }

    hDeviceService.saveHDevice(hDevice).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  hPacketField1: HPacketField =
    {
      packet: null,
      name: 'temperature',
      description: 'Temperature',
      type: 'DOUBLE',
      multiplicity: 'SINGLE'
    }

  hPacketField2: HPacketField =
    {
      packet: null,
      name: 'humidity',
      description: 'Humidity',
      type: 'DOUBLE',
      multiplicity: 'SINGLE'
    }


  //OK
  addDevicePacket() {
    var hPacketService: HpacketsService = new HpacketsService(this.httpClient, null, this.config);

    var hPacket: HPacket = {
      name: 'TestPacketTest',
      type: 'OUTPUT',
      format: 'JSON',
      serialization: 'AVRO',
      device: this.devicesList.find(x=>x.deviceName=='TestDeviceTest'),
      version: '1.0',
      fields: [this.hPacketField1, this.hPacketField2]
    }
    hPacketService.saveHPacket(hPacket).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  updatePacketFields() {
    var hPacketService: HpacketsService = new HpacketsService(this.httpClient, null, this.config);

    var hPacket2: HPacket = {
      id: this.packetList.find(x=>x.name=='TestPacketTest').id,
      name: 'TestPacketTest',
      type: 'OUTPUT',
      format: 'JSON',
      serialization: 'AVRO',
      device: this.devicesList.find(x=>x.deviceName=='TestDeviceTest'),
      version: '2.0',
      fields: [this.hPacketField1, this.hPacketField2]
    }
    hPacketService.updateHPacket(hPacket2).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //ok
  addRule() {
    var rulesService: RulesService = new RulesService(this.httpClient, null, this.config);

    var action = JSON.stringify({ actionName: "AddCategoryRuleAction2", ruleId:0, categoryIds: [456], ruleType: "ENRICHMENT" });

    var actions= [action];

    var str: string = JSON.stringify(actions);
    console.log(str)

    var rule: Rule = {
      name: 'TestRuleTest',
      description: 'Everybody wants to rule the world.',
      categoryIds:[123],
      project: this.projectList.find(x => x.name == 'Project prova'),
      packet:  this.packetList.find(x => x.name == 'TestPacketTest'),
      jsonActions: str,
      type:'ENRICHMENT',
      ruleDefinition: "packet.gps.latitude >= 3 AND packet.temperature > 6"
    }
    rulesService.saveRule(rule).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  updateRule(){
    var rulesService: RulesService = new RulesService(this.httpClient, null, this.config);

    var rule = this.ruleList.find(x=>x.name == 'TestRuleTest');
    rule.type='EVENT';
    rulesService.updateRule(rule).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }


  userList: HUser[] = [];
  //OK
  getAllUsers() {
    var hUserService: HusersService = new HusersService(this.httpClient, null, this.config);
    hUserService.findAllHUser_1().subscribe(
      res => {
        console.log(res);
        this.userList = <HUser[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }


  roleList: Role[];
  //OK
  getAllRoles() {
    var rolesService: RolesService = new RolesService(this.httpClient, null, this.config);
    rolesService.findAllRoles_1().subscribe(
      res => {
        console.log(res);
        this.roleList = <Role[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  permissionList: Permission[];
  //OK
  getAllPermissions() {
    var permissionService: PermissionsService = new PermissionsService(this.httpClient, null, this.config);
    permissionService.findAllPermission_1().subscribe(
      res => {
        console.log(res);
        this.permissionList = <Permission[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  projectList: HProject[];
  //OK
  getAllProject() {
    var hProjectsService: HprojectsService = new HprojectsService(this.httpClient, null, this.config);
    hProjectsService.findAllHProject_1().subscribe(
      res => {
        console.log(res);
        this.projectList = <HProject[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  devicesList: HDevice[];
  //OK
  getAllDevices() {
    var hdevicesService: HdevicesService = new HdevicesService(this.httpClient, null, this.config);
    hdevicesService.findAllHDevice_1().subscribe(
      res => {
        console.log(res);
        this.devicesList = <HDevice[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  packetList: HPacket[];
  //OK
  getAllPackets() {
    var hpacketsService: HpacketsService = new HpacketsService(this.httpClient, null, this.config);
    hpacketsService.findAllHPacket_1().subscribe(
      res => {
        console.log(res);
        this.packetList = <HPacket[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  ruleList: Rule[];
  //OK
  getAllRules() {
    var rulesService: RulesService = new RulesService(this.httpClient, null, this.config);
    rulesService.findAllRule_1().subscribe(
      res => {
        console.log(res);
        this.ruleList = <Rule[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  emailList: MailTemplate[];
  //OK
  getAllEmail() {
    var mailService: MailtemplatesService = new MailtemplatesService(this.httpClient, null, this.config);
    mailService.findAllMail_1().subscribe(
      res => {
        console.log(res);
        this.emailList = <MailTemplate[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  emailStatus(){
    var mailService: MailtemplatesService = new MailtemplatesService(this.httpClient, null, this.config);
    mailService.checkModuleWorking().subscribe(
      res => {
        console.log(res);
        this.emailList = <MailTemplate[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }


}