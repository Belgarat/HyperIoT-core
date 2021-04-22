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
import { HyperIoTAuthenticable } from './hyperIoTAuthenticable';
import { JWTProfile } from './jWTProfile';


export interface JWTLoginResponse { 
    token?: string;
    authenticable?: HyperIoTAuthenticable;
    profile?: { [key: string]: JWTProfile; };
}
