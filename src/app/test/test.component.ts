import { Component, OnInit, Input } from '@angular/core';
import { Configuration, ConfigurationParameters, AuthenticationService, JWTLoginResponse, HusersService, HUser, RolesService, Role, PermissionsService, Permission, HprojectsService, HProject, HdevicesService, HDevice, HpacketsService, HPacket, HPacketField, Rule, RulesService } from 'projects/core/src/public_api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Input('conf') config:Configuration;

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
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

    var roleId = this.roleList.find(x => x.name == 'Default').id;
    var userId = this.userList.find(x => x.username == 'giovanni').id;

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
      name: 'All permissions LUKE',
      actionIds: 256,
      entityResourceName: 'it.acsoftware.hyperiot.hproject.model.HProject',
      role: this.roleList.find(x => x.name == 'Default')
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



}
