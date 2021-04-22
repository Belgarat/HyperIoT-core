/**
 * hyperiot HProjectAlgorithm
 * HyperIoT HProjectAlgorithm API
 *
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface DashboardWidget { 
    id?: number;
    entityVersion: number;
    readonly entityCreateDate?: Date;
    readonly entityModifyDate?: Date;
    categoryIds?: Array<number>;
    tagIds?: Array<number>;
    widgetConf?: string;
}
