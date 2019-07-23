/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface RuleAction { 
    actionName?: string;
    ruleId?: number;
    ruleType?: RuleAction.RuleTypeEnum;
}
export namespace RuleAction {
    export type RuleTypeEnum = 'ENRICHMENT' | 'EVENT';
    export const RuleTypeEnum = {
        ENRICHMENT: 'ENRICHMENT' as RuleTypeEnum,
        EVENT: 'EVENT' as RuleTypeEnum
    };
}