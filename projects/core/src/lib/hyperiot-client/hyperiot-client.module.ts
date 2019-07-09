import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AreaClientModule } from './area-client/area-client.module';
// import { AssetCategoryClientModule } from './asset-category-client/asset-category-client.module';
// import { AssetTagClientModule } from './asset-tag-client/asset-tag-client.module';
// import { AuthenticationClientModule } from './authentication-client/authentication-client.module';
// import { HDeviceClientModule } from './h-device-client/h-device-client.module';
// import { HPacketClientModule } from './h-packet-client/h-packet-client.module';
// import { HProjectClientModule } from './h-project-client/h-project-client.module';
// import { HUserClientModule } from './h-user-client/h-user-client.module';
// import { KafkaConnectorClientModule } from './kafka-connector-client/kafka-connector-client.module';
// import { MailTemplatesClientModule } from './mail-templates-client/mail-templates-client.module';
// import { PermissionClientModule } from './permission-client/permission-client.module';
// import { RoleClientModule } from './role-client/role-client.module';
// import { RuleClientModule } from './rule-client/rule-client.module';
// import { StormManagerClientModule } from './storm-manager-client/storm-manager-client.module';

@NgModule({
  declarations: [],
  imports: [
    // AreaClientModule,
    // AssetCategoryClientModule,
    // AssetTagClientModule,
    // AuthenticationClientModule,
    // HDeviceClientModule,
    // HPacketClientModule,
    // HProjectClientModule,
    // HUserClientModule,
    // KafkaConnectorClientModule,
    // MailTemplatesClientModule,
    // PermissionClientModule,
    // RoleClientModule,
    // RuleClientModule,
    // StormManagerClientModule,
    CommonModule
  ]
})
export class HyperiotClientModule { }


// import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ApiModule as AreaModule } from './area-client/api-module/index';
// import { ApiModule as AssetCategoryModule } from './asset-category-client/api-module/index';
// import { ApiModule as AssetTagModule } from './asset-tag-client/api-module/index';
// import { ApiModule as AuthenticationModule } from './authentication-client/api-module/index';
// import { ApiModule as HDeviceModule } from './h-device-client/api-module/index';
// import { ApiModule as HPacketModule } from './h-packet-client/api-module/index';
// import { ApiModule as HProjectModule } from './h-project-client/api-module/index';
// import { ApiModule as HUserModule } from './h-user-client/api-module/index';
// import { ApiModule as KafkaConnectorModule } from './kafka-connector-client/api-module/index';
// import { ApiModule as MailTemplatesModule } from './mail-templates-client/api-module/index';
// import { ApiModule as PermissionModule } from './permission-client/api-module/index';
// import { ApiModule as RoleModule } from './role-client/api-module/index';
// import { ApiModule as RuleModule } from './rule-client/api-module/index';
// import { ApiModule as StormManagerModule } from './storm-manager-client/api-module/index';
// import { Configuration, ConfigurationParameters } from './models/models';
// import { HttpClient } from '@angular/common/http';

// export function apiConfigFactory(): Configuration {
//   const params: ConfigurationParameters = {
//     apiKeys: { 'AUTHORIZATION': 'JWT ' + localStorage.getItem('jwt') },
//     username: '',
//     password: '',
//     accessToken: ''
//   }
//   return new Configuration(params);
// }

// @NgModule({
//   declarations: [],
//   imports: [
//     AreaModule.forRoot(apiConfigFactory),
//     AssetCategoryModule.forRoot(apiConfigFactory),
//     AssetTagModule.forRoot(apiConfigFactory),
//     AuthenticationModule.forRoot(apiConfigFactory),
//     HDeviceModule.forRoot(apiConfigFactory),
//     HPacketModule.forRoot(apiConfigFactory),
//     HProjectModule.forRoot(apiConfigFactory),
//     HUserModule.forRoot(apiConfigFactory),
//     KafkaConnectorModule.forRoot(apiConfigFactory),
//     MailTemplatesModule.forRoot(apiConfigFactory),
//     PermissionModule.forRoot(apiConfigFactory),
//     RoleModule.forRoot(apiConfigFactory),
//     RuleModule.forRoot(apiConfigFactory),
//     StormManagerModule.forRoot(apiConfigFactory),
//     CommonModule
//   ]
// })
// export class HyperiotClientModule {
//   public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
//     console.log("NELLA FOR ROOT")
//     return {
//       ngModule: HyperiotClientModule,
//       providers: [{ provide: Configuration, useFactory: configurationFactory }]
//     };
//   }

//   constructor(@Optional() @SkipSelf() parentModule: HyperiotClientModule,
//     @Optional() http: HttpClient) {
//     if (parentModule) {
//       throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
//     }
//     if (!http) {
//       throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
//         'See also https://github.com/angular/angular/issues/20575');
//     }
//   }
// }
