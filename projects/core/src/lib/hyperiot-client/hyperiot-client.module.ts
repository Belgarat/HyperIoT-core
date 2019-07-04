import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaClientModule } from './area-client/area-client.module';
import { AssetCategoryClientModule } from './asset-category-client/asset-category-client.module';
import { AssetTagClientModule } from './asset-tag-client/asset-tag-client.module';
import { AuthenticationClientModule } from './authentication-client/authentication-client.module';
import { HDeviceClientModule } from './h-device-client/h-device-client.module';
import { HPacketClientModule } from './h-packet-client/h-packet-client.module';
import { HProjectClientModule } from './h-project-client/h-project-client.module';
import { HUserClientModule } from './h-user-client/h-user-client.module';
import { KafkaConnectorClientModule } from './kafka-connector-client/kafka-connector-client.module';
import { MailTemplatesClientModule } from './mail-templates-client/mail-templates-client.module';
import { PermissionClientModule } from './permission-client/permission-client.module';
import { RoleClientModule } from './role-client/role-client.module';
import { RuleClientModule } from './rule-client/rule-client.module';
import { StormManagerClientModule } from './storm-manager-client/storm-manager-client.module';

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
    CommonModule
  ]
})
export class HyperiotClientModule { }
