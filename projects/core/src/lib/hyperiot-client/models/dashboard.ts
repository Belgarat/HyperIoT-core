/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HProject } from './hProject';


export interface Dashboard { 
    id?: number;
    categoryIds?: Array<number>;
    tagIds?: Array<number>;
    name: string;
    dashboardType?: Dashboard.DashboardTypeEnum;
    hproject: HProject;
}
export namespace Dashboard {
    export type DashboardTypeEnum = 'OFFLINE' | 'REALTIME';
    export const DashboardTypeEnum = {
        OFFLINE: 'OFFLINE' as DashboardTypeEnum,
        REALTIME: 'REALTIME' as DashboardTypeEnum
    };
}
