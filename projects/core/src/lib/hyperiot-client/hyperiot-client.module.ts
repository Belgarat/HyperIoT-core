import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreasService } from './area-client/api-module/api/areas.service';
import { AssetscategoriesService } from './asset-category-client/api-module/api/assetscategories.service';
import { AssetstagsService } from './asset-tag-client/api-module/api/assetstags.service';
import { AuthenticationService } from './authentication-client/api-module/api/authentication.service';
import { HdevicesService } from './h-device-client/api-module/api/hdevices.service';
import { HpacketsService } from './h-packet-client/api-module/api/hpackets.service';
import { HprojectsService } from './h-project-client/api-module/api/hprojects.service';
import { HusersService } from './h-user-client/api-module/api/husers.service';
import { KafkaService } from './kafka-connector-client/api-module/api/kafka.service';
import { MailtemplatesService } from './mail-templates-client/api-module/api/mailtemplates.service';
import { PermissionsService } from './permission-client/api-module/api/permissions.service';
import { RolesService } from './role-client/api-module/api/roles.service';
import { RulesService } from './rule-client/api-module/api/rules.service';
import { StormService } from './storm-manager-client/api-module/api/storm.service';
import { DashboardsService } from './dashboard-client/api-module/api/dashboards.service';
import { DashboardwidgetsService } from './dashboard-widgets-client/api-module/api/dashboardwidgets.service';
import { CompaniesService } from './company-client/api-module/api/companies.service';
import { Configuration } from './models/models';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AreasService,
    AssetscategoriesService,
    AssetstagsService,
    AuthenticationService,
    HdevicesService,
    HpacketsService,
    HprojectsService,
    HusersService,
    KafkaService,
    MailtemplatesService,
    PermissionsService,
    RolesService,
    RulesService,
    StormService,
    DashboardsService,
    DashboardwidgetsService,
    CompaniesService
  ]
})
export class HyperiotClientModule {
  public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
    return {
      ngModule: HyperiotClientModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }]
    };
  }
}