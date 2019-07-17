/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Role } from './role';


export interface Permission { 
    id?: number;
    categoryIds?: Array<number>;
    tagIds?: Array<number>;
    name?: string;
    actionIds?: number;
    entityResourceName: string;
    resourceId?: number;
    role: Role;
}
