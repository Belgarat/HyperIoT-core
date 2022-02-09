/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { CommandInfo } from './commandInfo';
import { DataFlavor } from './dataFlavor';
import { DataSource } from './dataSource';
import { InputStream } from './inputStream';
import { OutputStream } from './outputStream';


export interface DataHandler { 
    dataSource?: DataSource;
    name?: string;
    content?: any;
    inputStream?: InputStream;
    contentType?: string;
    outputStream?: OutputStream;
    transferDataFlavors?: Array<DataFlavor>;
    preferredCommands?: Array<CommandInfo>;
    allCommands?: Array<CommandInfo>;
}
