/**
 * OpenAPI spec version: 1.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface MqttConnectorConfig { 
    name?: string;
    topic?: string;
    mqttServer?: string;
    mqttTopic?: string;
    mqttReconnect?: boolean;
    mqttUsername?: string;
    mqttPassword?: string;
    maxPollIntervalMs?: number;
    connectorClass?: string;
    tasksMax?: number;
}
