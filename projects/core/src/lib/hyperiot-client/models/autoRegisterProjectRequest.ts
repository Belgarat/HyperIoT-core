/**
 * HyperIoT HProject
 * HyperIoT HProject API
 *
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HPacket } from './hPacket';


export interface AutoRegisterProjectRequest { 
    cipherTextChallenge: string;
    projectId: number;
    packets: Array<HPacket>;
}
