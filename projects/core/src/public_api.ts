/*
 * Public API Surface of core
 */

export * from './lib/core.service';
export * from './lib/core.component';
export * from './lib/core.module';

// export {
//     HyperiotBaseModule,
//     WidgetComponent,
//     WidgetChartComponent,
//     TimeSeries,
//     DataPacketFilter as DataPacket,
//     DataStreamService as DataChannelService,
//     PlotlyModule, PlotlyJS
// } from './lib/hyperiot-base/hyperiot-base.module';

export { AreasService } from './lib/hyperiot-client/area-client/api-module/index';
export { AssetscategoriesService } from './lib/hyperiot-client/asset-category-client/api-module/index';
export { AssetstagsService } from './lib/hyperiot-client/asset-tag-client/api-module/index';
export { AuthenticationService } from './lib/hyperiot-client/authentication-client/api-module/index';
export { HdevicesService } from './lib/hyperiot-client/h-device-client/api-module/index';
export { HpacketsService } from './lib/hyperiot-client/h-packet-client/api-module/index';
export { HprojectsService } from './lib/hyperiot-client/h-project-client/api-module/index';
export { HusersService } from './lib/hyperiot-client/h-user-client/api-module/index';
export { KafkaService } from './lib/hyperiot-client/kafka-connector-client/api-module/index';
export { MailtemplatesService } from './lib/hyperiot-client/mail-templates-client/api-module/index';
export { PermissionsService, } from './lib/hyperiot-client/permission-client/api-module/index';
export { RolesService } from './lib/hyperiot-client/role-client/api-module/index';
export { RulesService } from './lib/hyperiot-client/rule-client/api-module/index';
export { StormService } from './lib/hyperiot-client/storm-manager-client/api-module/index';

export { ApiModule as AreasModule } from './lib/hyperiot-client/area-client/api-module/api.module';
export { ApiModule as AssetscategoriesModule } from './lib/hyperiot-client/asset-category-client/api-module/api.module';
export { ApiModule as AssetstagsModule } from './lib/hyperiot-client/asset-tag-client/api-module/api.module';
export { ApiModule as AuthenticationModule } from './lib/hyperiot-client/authentication-client/api-module/api.module';
export { ApiModule as HdevicesModule } from './lib/hyperiot-client/h-device-client/api-module/api.module';
export { ApiModule as HpacketsModule } from './lib/hyperiot-client/h-packet-client/api-module/api.module';
export { ApiModule as HprojectsModule } from './lib/hyperiot-client/h-project-client/api-module/api.module';
export { ApiModule as HUserModule } from './lib/hyperiot-client/h-user-client/api-module/api.module';
export { ApiModule as KafkaModule } from './lib/hyperiot-client/kafka-connector-client/api-module/api.module';
export { ApiModule as MailtemplatesModule } from './lib/hyperiot-client/mail-templates-client/api-module/api.module';
export { ApiModule as PermissionsModule, } from './lib/hyperiot-client/permission-client/api-module/api.module';
export { ApiModule as RolesModule } from './lib/hyperiot-client/role-client/api-module/api.module';
export { ApiModule as RulesModule } from './lib/hyperiot-client/rule-client/api-module/api.module';
export { ApiModule as StormModule } from './lib/hyperiot-client/storm-manager-client/api-module/api.module';

export * from './lib/hyperiot-client/models/models';