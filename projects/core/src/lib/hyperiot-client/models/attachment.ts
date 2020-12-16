/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ContentDisposition } from './contentDisposition';
import { DataHandler } from './dataHandler';
import { MediaType } from './mediaType';


export interface Attachment { 
    headers?: { [key: string]: Array<string>; };
    object?: any;
    dataHandler?: DataHandler;
    contentDisposition?: ContentDisposition;
    contentId?: string;
    contentType?: MediaType;
}
