import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule as AreaClientModule } from './area-client/api-module/api.module';
import { ApiModule as AssetCategoryClientModule } from './asset-category-client/api-module/api.module';
import { ApiModule as AssetTagClientModule } from './asset-tag-client/api-module/api.module';
import { ApiModule as AuthenticationClientModule } from './authentication-client/api-module/api.module';
import { ApiModule as HDeviceClientModule } from './h-device-client/api-module/api.module';
import { ApiModule as HPacketClientModule } from './h-packet-client/api-module/api.module';
import { ApiModule as HProjectClientModule } from './h-project-client/api-module/api.module';
import { ApiModule as HUserClientModule } from './h-user-client/api-module/api.module';
import { ApiModule as KafkaConnectorClientModule } from './kafka-connector-client/api-module/api.module';
import { ApiModule as MailTemplatesClientModule } from './mail-templates-client/api-module/api.module';
import { ApiModule as PermissionClientModule } from './permission-client/api-module/api.module';
import { ApiModule as RoleClientModule } from './role-client/api-module/api.module';
import { ApiModule as RuleClientModule } from './rule-client/api-module/api.module';
import { ApiModule as StormManagerClientModule } from './storm-manager-client/api-module/api.module';
import { ApiModule as DashboardClientModule } from './dashboard-client/api-module/api.module';
import { ApiModule as DashboardWidgetsClientModule } from './dashboard-widgets-client/api-module/api.module';
import { ApiModule as CompanyClient } from './company-client/api-module/api.module';

@NgModule({
  declarations: [],
  imports: [
    AreaClientModule,
    AssetCategoryClientModule,
    AssetTagClientModule,
    AuthenticationClientModule,
    HDeviceClientModule,
    HPacketClientModule,
    HProjectClientModule,
    HUserClientModule,
    KafkaConnectorClientModule,
    MailTemplatesClientModule,
    PermissionClientModule,
    RoleClientModule,
    RuleClientModule,
    StormManagerClientModule,
    DashboardClientModule,
    DashboardWidgetsClientModule,
    CompanyClient,
    CommonModule
  ]
})
export class HyperiotClientModule { }