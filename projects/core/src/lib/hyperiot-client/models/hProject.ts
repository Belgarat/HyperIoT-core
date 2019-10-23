/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Area } from './area';
import { Dashboard } from './dashboard';
import { HDevice } from './hDevice';
import { HUser } from './hUser';
import { Rule } from './rule';


export interface HProject { 
    id?: number;
    entityVersion: number;
    readonly entityCreateDate?: Date;
    readonly entityModifyDate?: Date;
    categoryIds?: Array<number>;
    tagIds?: Array<number>;
    name?: string;
    description?: string;
    user?: HUser;
    deviceCount?: number;
    statisticsCount?: number;
    rulesCount?: number;
    devices?: Array<HDevice>;
    dashboards?: Array<Dashboard>;
    areas?: Array<Area>;
    rules?: Array<Rule>;
    pubKey?: Array<string>;
}
