import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Configuration, MailTemplate, MailtemplatesService, ConfigurationParameters, AuthenticationService, JWTLoginResponse, HUser, RolesService, Role, PermissionsService, Permission, HprojectsService, HProject, HdevicesService, HDevice, HpacketsService, HPacket, HPacketField, Rule, RulesService, HUserPasswordReset, Dashboard, DashboardsService, DashboardWidget } from '@hyperiot/core';
import { HusersService } from '@hyperiot/core'
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
    private rolesService: RolesService,
    private dashboardService: DashboardsService
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
        var jwtToken = <JWTLoginResponse>res;
        document.cookie = 'HIT-AUTH=' + jwtToken.token;
        this.loginClass = 'loginClassOk';

        this.conf = {
          apiKeys: { 'AUTHORIZATION': 'JWT ' + jwtToken.token },
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

  whoAmI() {
    this.authService.whoAmI().subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  user: HUser;
  //OK
  reg() {
    this.user = {
      entityVersion: 1,
      name: this.registerForm.value.nome,
      lastname: this.registerForm.value.cognome,
      username: this.registerForm.value.userName,
      email: this.registerForm.value.mail,
      password: this.registerForm.value.password,
      passwordConfirm: this.registerForm.value.confPassword
    }

    this.hUserService.register(this.user).subscribe(
      res => { this.registerClass = 'registerClassOk'; },
      err => {
        console.log(err.status);
        this.registerClass = 'registerClassError';
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
  moduleStatus() {
    this.hUserService.checkModuleWorking().subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  //OK
  recoveryRequest(mail: string) {
    this.hUserService.resetPasswordRequest(mail).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  //OK
  resetPassword(codeRecovery: string, mail: string) {
    var pwdRest: HUserPasswordReset = {
      password: 'M0entane0$',
      passwordConfirm: 'M0entane0$',
      email: mail,
      resetCode: codeRecovery
    }

    this.hUserService.resetPassword(pwdRest).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  //OK
  changePassword() {
    this.hUserService.changeHUserPassword(39, 'M0entane0$', 'S1eadlf!', 'S1eadlf!').subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  updateUser() {
    var user: HUser = {
      entityVersion: 1,
      categoryIds: null,
      email: "giovanni.colacitti@acsoftware.it",
      id: 44,
      lastname: "Colacitti",
      name: "Giovanni",
      tagIds: null,
      username: "giovanni",
    }
    // var user = this.userList.find(x=>x.id==39);
    // console.log(user)
    // user.password = 'S1eadlf!'
    user.active = false;

    this.hUserService.updateHUser(user).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  deleteHUser() {
    this.hUserService.deleteHUser(44).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  role: Role;
  //OK
  addRole() {
    this.role = {
      entityVersion: 1,
      name: 'DefaultRole 3',
      description: 'Default user role 3'
    };

    this.rolesService.saveRole(this.role).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //OK
  addDefaultRole() {
    var roleId = 58;
    var userId = this.userList.find(x => x.username == 'gabriele').id;

    this.rolesService.saveUserRole(roleId, userId).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //OK
  deleteRole() {
    this.rolesService.deleteRole(6).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //OK 'actionIds' should be required in Permission interface
  grant() {
    var permission: Permission = {
      entityVersion: 1,
      name: 'Prova permission',
      actionIds: 128,
      entityResourceName: 'it.acsoftware.hyperiot.hproject.model.HProject',
      role: this.roleList.find(x => x.name == 'DefaultRole 3')
    }
    console.log(permission)

    this.permissionService.savePermission(permission).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //OK
  addUserProject() {
    var use: HUser = this.userList.find(x => x.username == 'gabriele')
    console.log(use)

    var hProject: HProject = {
      entityVersion: 1,
      categoryIds: [],
      tagIds: [],
      name: 'TestProject2',
      description: 'Progetto test 2',
      user: use
    }
    this.hProjectService.saveHProject(hProject).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //OK
  addUserDevice() {
    // var hDevice: HDevice = {
    //   deviceName: 'ProvaDevice',
    //   brand: 'ACS',
    //   model: 'ESP8266 NODE MCU',
    //   firmwareVersion: '1.0.0',
    //   softwareVersion: '1.0.0',
    //   description: 'Description',
    //   password: 'Password01!',
    //   passwordConfirm: 'Password01!',
    //   project: this.projectList.find(x => x.name == 'First project 2')
    // }

    var hDevice: HDevice = {
      entityVersion: 1,
      deviceName: 'Arduino2',
      brand: 'ACS',
      model: 'ESP8266 NODE MCU',
      firmwareVersion: '1.0.0',
      softwareVersion: '1.0.0',
      description: 'Description',
      password: 'Password123!',
      passwordConfirm: 'Password123!',
      project: this.projectList.find(x => x.name == 'Luke Project')
    }

    this.hDeviceService.saveHDevice(hDevice).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  hPacketField1: HPacketField =
    {
      entityVersion: 1,
      name: 'temperature',
      description: 'Temperature',
      type: 'DOUBLE',
      multiplicity: 'SINGLE'
    }

  hPacketField2: HPacketField =
    {
      entityVersion: 1,
      name: 'humidity',
      description: 'Humidity',
      type: 'DOUBLE',
      multiplicity: 'SINGLE'
    }

  hPacketField3: HPacketField =
    {
      entityVersion: 1,
      name: 'distance',
      description: 'Distance',
      type: 'DOUBLE',
      multiplicity: 'SINGLE'
    }

  hPacketField4: HPacketField =
    {
      entityVersion: 1,
      name: 'brightness',
      description: 'Brightness',
      type: 'DOUBLE',
      multiplicity: 'SINGLE'
    }


  //OK
  addDevicePacket() {
    var hPacket: HPacket = {
      entityVersion: 1,
      name: 'ArduinoPacket2',
      type: 'OUTPUT',
      format: 'JSON',
      serialization: 'AVRO',
      device: this.devicesList.find(x => x.deviceName == 'Arduino2'),
      version: '1.0'
    }
    this.hPacketService.saveHPacket(hPacket).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  updatePacketFields() {
    var hPacket2: HPacket = {
      entityVersion: 2,
      id: 57,
      name: 'ArduinoPacket2',
      type: 'OUTPUT',
      format: 'JSON',
      serialization: 'AVRO',
      device: this.devicesList.find(x => x.id == 56),
      version: '3.0',
      fields: [this.hPacketField1, this.hPacketField2, this.hPacketField3, this.hPacketField4]
    }
    this.hPacketService.updateHPacket(hPacket2).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  //ok
  addRule() {
    var action = JSON.stringify({ actionName: "AddCategoryRuleAction2", ruleId: 0, categoryIds: [456], ruleType: "ENRICHMENT" });

    var actions = [action];

    var str: string = JSON.stringify(actions);
    console.log(str)

    var rule: Rule = {
      entityVersion: 1,
      name: 'TestRuleTest',
      description: 'Everybody wants to rule the world.',
      categoryIds: [123],
      project: this.projectList.find(x => x.name == 'Project prova'),
      packet: this.packetList.find(x => x.name == 'TestPacketTest'),
      jsonActions: str,
      type: 'ENRICHMENT',
      ruleDefinition: "packet.gps.latitude >= 3 AND packet.temperature > 6"
    }
    this.rulesService.saveRule(rule).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  updateRule() {
    var rule = this.ruleList.find(x => x.name == 'TestRuleTest');
    rule.type = 'EVENT';
    this.rulesService.updateRule(rule).subscribe(
      res => { },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  addDashboard() {

    var hp: HProject = this.projectList.find(x => x.id == 45)

    var dashboard: Dashboard = {
      entityVersion: 1,
      name: 'LukeDashboard',
      dashboardType: 'REALTIME',
      hproject: hp
    }

    this.dashboardService.saveDashboard(dashboard).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
  }

  addWidget() {

    var da: Dashboard = this.dashboardList.find(x => x.id == 246)

    var dashboard: DashboardWidget = {
      entityVersion: 1,
      dashboard: da
    }

    this.dashboardService.saveDashboard(dashboard).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
  }


  userList: HUser[] = [];
  //OK
  getAllUsers() {
    this.hUserService.findAllHUser().subscribe(
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
    this.rolesService.findAllRoles().subscribe(
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
    this.permissionService.findAllPermission().subscribe(
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
    this.hProjectService.findAllHProject().subscribe(
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
    this.hDeviceService.findAllHDevice().subscribe(
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
    this.hPacketService.findAllHPacket().subscribe(
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
    this.rulesService.findAllRule().subscribe(
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
    mailService.findAllMail().subscribe(
      res => {
        console.log(res);
        this.emailList = <MailTemplate[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  dashboardList: Dashboard[];
  //OK
  getAllDashboard() {
    this.dashboardService.findAllDashboard().subscribe(
      res => {
        console.log(res);
        this.dashboardList = <Dashboard[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }

  emailStatus() {
    var mailService: MailtemplatesService = new MailtemplatesService(this.httpClient, null, this.config);
    mailService.checkModuleWorking().subscribe(
      res => {
        console.log(res);
        this.emailList = <MailTemplate[]>res;
      },
      err => { if (err.status == 401) console.log("redirect to login...") }
    )
  }


  changeProject() {
    var hProjectService: HprojectsService = new HprojectsService(this.httpClient, null, this.config);
    var hUserService: HusersService = new HusersService(this.httpClient, null, this.config);

    var usera;
    hUserService.findHUser(50).subscribe(
      res => {
        usera = res;
      }
    )

    hProjectService.findHProject(45).subscribe(
      res => {
        let pr = <HProject>res;
        console.log(usera)
        pr.user = usera
        console.log(pr)
        hProjectService.updateHProject(pr).subscribe(
          res => { }
        )
      }
    )
  }

  options = [
    { name: "Project", value: 'Project' },
    { name: "Device", value: 'Device' },
    { name: "Packet", value: 'Packet' },
    { name: "Field", value: 'Field' },
    { name: "Rule", value: 'Rule' }
  ]

  number: number;
  deleteType: string = '';
  esito: string = '';

  delete() {
    if (this.deleteType == '')
      alert("Seleziona un tipo di dato");
    else if (!this.number)
      alert("Seleziona un numero");
    else {
      this.esito = 'PENDING';
      switch (this.deleteType) {
        case 'Project': {
          this.hProjectService.deleteHProject(this.number).subscribe(
            res => this.esito = "OK",
            err => this.esito = "ERRORE"
          );
          break;
        }
        case 'Device': {
          this.hDeviceService.deleteHDevice(this.number).subscribe(
            res => this.esito = "OK",
            err => this.esito = "ERRORE"
          );
          break;
        }
        case 'Packet': {
          this.hPacketService.deleteHPacket(this.number).subscribe(
            res => this.esito = "OK",
            err => this.esito = "ERRORE"
          );
          break;
        }
        case 'Field': {
          let foo = prompt('Di quale pacchetto?');
          this.hPacketService.deleteHPacketField(+foo, this.number).subscribe(
            res => this.esito = "OK",
            err => this.esito = "ERRORE"
          );
          break;
        }
        case 'Rule': {
          this.rulesService.deleteRule(this.number).subscribe(
            res => this.esito = "OK",
            err => this.esito = "ERRORE"
          );
          break;
        }
        default:
          alert("errore")
      }
    }
  }

  showBar: boolean = false;

  destroyAll() {
    if (confirm("Vuoi veramente ripulire tutto? Seleziona 'Annulla' se non sai cosa stai facendo...")) {
      this.showBar = true;
      setTimeout(() => {
        var bar = document.getElementById("myBar");
        let count = -1;
        let width = 0;
        let interval = setInterval(() => {
          width += 20;
          bar.style.width = width + '%';
          count++;
          if (count == 4) {
            clearInterval(interval)
            setTimeout(() => {
              this.showBar = false;
            }, 500);
          }
          this.destroy(count)
        }, 5000);
      }, 0);

    } else { }
  }

  destroy(count: number) {

    switch (count) {
      case 0: {
        console.log("Deleting rules");
        this.rulesService.findAllRule().subscribe(
          res => {
            this.ruleList = <Rule[]>res;
            this.ruleList.forEach((x) => {
              this.rulesService.deleteRule(x.id).subscribe()
            })
          }
        )
        break;
      }
      case 1: {
        console.log("Deleting packets");
        this.hPacketService.findAllHPacket().subscribe(
          res => {
            this.packetList = <HPacket[]>res;
            this.packetList.forEach((x) => {
              this.hPacketService.deleteHPacket(x.id).subscribe()
            })
          }
        )
        break;
      }
      case 2: {
        console.log("Deleting devices");
        this.hDeviceService.findAllHDevice().subscribe(
          res => {
            this.devicesList = <HDevice[]>res;
            this.devicesList.forEach((x) => {
              this.hDeviceService.deleteHDevice(x.id).subscribe();
            })
          }
        )
        break;
      }
      case 3: {
        console.log("Deleting projects");
        this.hProjectService.findAllHProject().subscribe(
          res => {
            this.projectList = <HProject[]>res;
            this.projectList.forEach((x) => {
              this.hProjectService.deleteHProject(x.id).subscribe();
            })
          }
        )
        break;
      }
    }

  }

}
