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


export interface AlgorithmIOField { 
    id?: number;
    name?: string;
    description?: string;
    fieldType?: AlgorithmIOField.FieldTypeEnum;
    multiplicity?: AlgorithmIOField.MultiplicityEnum;
    type?: AlgorithmIOField.TypeEnum;
}
export namespace AlgorithmIOField {
    export type FieldTypeEnum = 'NUMBER' | 'INTEGER' | 'LONG' | 'DOUBLE' | 'FLOAT' | 'TEXT' | 'BYTE';
    export const FieldTypeEnum = {
        NUMBER: 'NUMBER' as FieldTypeEnum,
        INTEGER: 'INTEGER' as FieldTypeEnum,
        LONG: 'LONG' as FieldTypeEnum,
        DOUBLE: 'DOUBLE' as FieldTypeEnum,
        FLOAT: 'FLOAT' as FieldTypeEnum,
        TEXT: 'TEXT' as FieldTypeEnum,
        BYTE: 'BYTE' as FieldTypeEnum
    };
    export type MultiplicityEnum = 'SINGLE' | 'ARRAY' | 'MATRIX';
    export const MultiplicityEnum = {
        SINGLE: 'SINGLE' as MultiplicityEnum,
        ARRAY: 'ARRAY' as MultiplicityEnum,
        MATRIX: 'MATRIX' as MultiplicityEnum
    };
    export type TypeEnum = 'INPUT' | 'OUTPUT';
    export const TypeEnum = {
        INPUT: 'INPUT' as TypeEnum,
        OUTPUT: 'OUTPUT' as TypeEnum
    };
}
