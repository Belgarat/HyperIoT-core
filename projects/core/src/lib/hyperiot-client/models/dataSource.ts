/**
 * HyperIoT Storm Manager
 * HyperIoT StormManager API
 *
 * OpenAPI spec version: 1.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { InputStream } from './inputStream';
import { OutputStream } from './outputStream';


export interface DataSource { 
    contentType?: string;
    outputStream?: OutputStream;
    name?: string;
    inputStream?: InputStream;
}
