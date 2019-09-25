import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Configuration, MailTemplate, MailtemplatesService, ConfigurationParameters, AuthenticationService, JWTLoginResponse, HUser, AssetstagsService, AssetscategoriesService, RolesService, Role, PermissionsService, Permission, HprojectsService, HProject, HdevicesService, HDevice, HpacketsService, HPacket, HPacketField, Rule, RulesService, HUserPasswordReset, Dashboard, DashboardsService, DashboardWidget } from '@hyperiot/core';
import { HusersService } from '@hyperiot/core'
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { LoggerService } from 'projects/core/src/lib/hyperiot-service/hyperiot-logger/logger.service';
import { Logger } from 'projects/core/src/lib/hyperiot-service/hyperiot-logger/logger';

@Component({
  selector: 'app-service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.css']
})
export class ServiceTestComponent {

  logger: Logger;

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
    private dashboardService: DashboardsService,
    private tagService: AssetstagsService,
    private categoryService: AssetscategoriesService,
    private loggerService: LoggerService
  ) {
    this.config = new Configuration(this.conf)
    this.logger = new Logger(loggerService);
    this.logger.registerClass('ServiceTestComponent');
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
        this.logger.debug('Login response:', res);
        var jwtToken = <JWTLoginResponse>res;
        this.logger.trace('jwtToken', jwtToken);
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

        this.config = new Configuration(this.conf);
        this.logger.trace('Configuration:', this.config);
      },
      err => {
        this.logger.error('Error! Incorrect user name and/or password', err);
        // console.log(err.status);
        // this.loginClass = 'loginClassError';
        // this.status = err.status
      }
    );
  }

  whoAmI() {
    this.authService.whoAmI().subscribe(
      res => {
        this.logger.debug('whoAmI method:', res);
        // console.log(res)
      },
      err => {
        this.logger.error('Error! Information not available', err);
        // console.log(err)
      }
    );
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
      res => {
        this.logger.debug('User-submitted data:', res);
        this.registerClass = 'registerClassOk';
      },
      err => {
        this.logger.error('Error! Invalid form entry', err);
        //console.log(err.status);
        this.registerClass = 'registerClassError';
      }
    );
  }

  //OK
  activate(act) {
    this.hUserService.activate(this.user.email, act).subscribe(
      res => {
        this.logger.debug('Activation response:', res)
      },
      err => {
        this.logger.error('Error! Unable to activate the account', err);
      }
    );
  }

  //OK
  moduleStatus() {
    this.hUserService.checkModuleWorking().subscribe(
      res => {
        this.logger.debug('Module status:', res);
        // console.log(res)
      },
      err => {
        this.logger.error('Unable to check module status:', err);
        // console.log(err)
      }
    );
  }

  //OK
  recoveryRequest(mail: string) {
    this.hUserService.resetPasswordRequest(mail).subscribe(
      res => {
        this.logger.debug('', res);
      },
      err => {
        this.logger.error('Email not found', err);
      }
    );
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
      res => { this.logger.debug('', res); },
      err => { this.logger.error('', err); }
    );
  }

  //OK
  changePassword() {
    this.hUserService.changeHUserPassword(39, 'M0entane0$', 'S1eadlf!', 'S1eadlf!').subscribe(
      res => {
        this.logger.debug('', res);
      },
      err => {
        this.logger.error('', err);
      }
    );
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
      res => {
        this.logger.debug('', res);
      },
      err => {
        this.logger.error('', err);
      }
    );
  }

  deleteHUser() {
    this.hUserService.deleteHUser(44).subscribe(
      res => {
        this.logger.debug('', res);
      },
      err => {
        this.logger.error('', err);
      }
    );
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
      err => { if (err.status == 401) this.logger.error('', err); }
    );
  }

  //OK
  addDefaultRole() {
    var roleId = 58;
    var userId = this.userList.find(x => x.username == 'gabriele').id;

    this.rolesService.saveUserRole(roleId, userId).subscribe(
      res => { },
      err => { if (err.status == 401) this.logger.error('', err); }
    );
  }

  //OK
  deleteRole() {
    this.rolesService.deleteRole(6).subscribe(
      res => { },
      err => { if (err.status == 401) this.logger.error('', err); }
    );
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
    this.logger.trace('', permission);

    this.permissionService.savePermission(permission).subscribe(
      res => { },
      err => { if (err.status == 401) this.logger.error('', err); }
    );
  }

  //OK
  addUserProject() {
    var use: HUser = this.userList.find(x => x.username == 'gabriele');
    this.logger.trace('user:', use);

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
      err => { if (err.status == 401) this.logger.error('', err); }
    );
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
      err => { if (err.status == 401) this.logger.error('', err); }
    );
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
      err => { if (err.status == 401) this.logger.error('', err); }
    );
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
      err => { if (err.status == 401) this.logger.error('', err); }
    );
  }

  //ok
  addRule() {
    var action = JSON.stringify({ actionName: "AddCategoryRuleAction2", ruleId: 0, categoryIds: [456], ruleType: "ENRICHMENT" });

    var actions = [action];

    var str: string = JSON.stringify(actions);
    this.logger.trace('Actions:', str)

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
      err => { if (err.status == 401) this.logger.error('', err); }
    );
  }

  updateRule() {
    var rule = this.ruleList.find(x => x.name == 'TestRuleTest');
    rule.type = 'EVENT';
    this.rulesService.updateRule(rule).subscribe(
      res => { },
      err => { if (err.status == 401) this.logger.error('', err); }
    );
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
        this.logger.debug('', res)
      },
      err => console.log(err)
    );
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
    );
  }


  userList: HUser[] = [];
  //OK
  getAllUsers() {
    this.hUserService.findAllHUser().subscribe(
      res => {
        this.logger.debug('', res);
        this.userList = <HUser[]>res;
        this.logger.trace('User list:', this.userList);
      },
      err => { if (err.status == 401) this.logger.error('', err); }
    );
  }


  roleList: Role[];
  //OK
  getAllRoles() {
    this.rolesService.findAllRoles().subscribe(
      res => {
        this.logger.debug('', res);
        this.roleList = <Role[]>res;
        this.logger.trace('Role list:', this.roleList);
      },
      err => { if (err.status == 401) this.logger.error('', err); }
    );
  }

  permissionList: Permission[];
  //OK
  getAllPermissions() {
    this.permissionService.findAllPermission().subscribe(
      res => {
        this.logger.debug('', res);
        this.permissionList = <Permission[]>res;
        this.logger.trace('Permission list:', this.permissionList);
      },
      err => { if (err.status == 401) this.logger.error('', err); }
    );
  }

  projectList: HProject[];
  //OK
  getAllProject() {
    this.hProjectService.findAllHProject().subscribe(
      res => {
        this.logger.debug('', res);
        this.projectList = <HProject[]>res;
        this.logger.trace('Project list:', this.projectList);
      },
      err => { if (err.status == 401) this.logger.error('', err); }
    );
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
        this.logger.debug('');
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
    { name: "Rule", value: 'Rule' },
    { name: "Tag", value: 'Tag' },
    { name: "Category", value: 'Category' }
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
        case 'Tag': {
          this.tagService.deleteAssetTag(this.number).subscribe(
            res => this.esito = "OK",
            err => this.esito = "ERRORE"
          );
          break;
        }
        case 'Category': {
          this.categoryService.deleteAssetCategory(this.number).subscribe(
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
        let width = 2;
        let interval = setInterval(() => {
          width += 14;
          bar.style.width = width + '%';
          count++;
          if (count == 6) {
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
      case 4: {
        console.log("Deleting tags");
        this.tagService.findAllAssetTag().subscribe(
          res => {
            res.forEach((x) => {
              this.tagService.deleteAssetTag(x.id).subscribe();
            })
          }
        )
        break;
      }
      case 5: {
        console.log("Deleting categories");
        this.categoryService.findAllAssetCategory().subscribe(
          res => {
            res.forEach((x) => {
              this.categoryService.deleteAssetCategory(x.id).subscribe();
            })
          }
        )
        break;
      }
    }

  }

  cardView() {
    this.hProjectService.cardsView().subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}
