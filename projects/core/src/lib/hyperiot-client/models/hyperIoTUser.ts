/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HyperIoTRole } from './hyperIoTRole';


export interface HyperIoTUser { 
    lastname?: string;
    email?: string;
    roles?: Array<HyperIoTRole>;
    username?: string;
    name?: string;
    categoryIds?: Array<number>;
    tagIds?: Array<number>;
    entityCreateDate?: Date;
    systemApiClassName?: string;
    id?: number;
    entityVersion?: number;
    resourceName?: string;
    screenName?: string;
}
