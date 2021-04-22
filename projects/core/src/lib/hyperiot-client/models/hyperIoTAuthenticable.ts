/**
 * HyperIoT Authentication
 * HyperIoT Authentication API
 *
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HyperIoTRole } from './hyperIoTRole';


export interface HyperIoTAuthenticable { 
    screenName?: string;
    roles?: Array<HyperIoTRole>;
    systemApiClassName?: string;
    tagIds?: Array<number>;
    entityCreateDate?: Date;
    id?: number;
    categoryIds?: Array<number>;
    entityVersion?: number;
    resourceName?: string;
}
