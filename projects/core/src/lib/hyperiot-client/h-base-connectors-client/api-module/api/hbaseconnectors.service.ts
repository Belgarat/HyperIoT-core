/**
 * hyperiot HBaseConnector
 * HyperIoT HBaseConnector API
 *
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';


import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../../../models/configuration';


@Injectable()
export class HbaseconnectorsService {

    protected basePath = '/hyperiot/hbaseconnectors';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * /hyperiot/hbaseconnector/checkConnection
     * Check HBase client connection
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public checkConnection(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public checkConnection(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public checkConnection(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public checkConnection(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/checkConnection`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /module/status
     * Simple service for checking module status
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public checkModuleWorking(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public checkModuleWorking(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public checkModuleWorking(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public checkModuleWorking(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/module/status`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/hbaseconnector/createTable
     * Service for creating new table
     * @param tableName 
     * @param columnFamilies 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createTable(tableName?: string, columnFamilies?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createTable(tableName?: string, columnFamilies?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createTable(tableName?: string, columnFamilies?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createTable(tableName?: string, columnFamilies?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/x-www-form-urlencoded'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (tableName !== undefined) {
            formParams = formParams.append('tableName', <any>tableName) || formParams;
        }
        if (columnFamilies !== undefined) {
            formParams = formParams.append('columnFamilies', <any>columnFamilies) || formParams;
        }

        return this.httpClient.post<any>(`${this.basePath}/createTable`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/hbaseconnector/deleteData
     * Service for delete data
     * @param tableName 
     * @param rowKey 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteData(tableName?: string, rowKey?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteData(tableName?: string, rowKey?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteData(tableName?: string, rowKey?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteData(tableName?: string, rowKey?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/x-www-form-urlencoded'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (tableName !== undefined) {
            formParams = formParams.append('tableName', <any>tableName) || formParams;
        }
        if (rowKey !== undefined) {
            formParams = formParams.append('rowKey', <any>rowKey) || formParams;
        }

        return this.httpClient.delete<any>(`${this.basePath}/deleteData`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/hbaseconnector/disableTable/{tableName}
     * Service for disabling table
     * @param tableName Table name which must be disabled
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public disableTable(tableName: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public disableTable(tableName: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public disableTable(tableName: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public disableTable(tableName: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (tableName === null || tableName === undefined) {
            throw new Error('Required parameter tableName was null or undefined when calling disableTable.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.put<any>(`${this.basePath}/disableTable/${encodeURIComponent(String(tableName))}`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/hbaseconnector/dropTable/{tableName}
     * Service for deleting a table
     * @param tableName The table name which must be dropped
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public dropTable(tableName: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public dropTable(tableName: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public dropTable(tableName: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public dropTable(tableName: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (tableName === null || tableName === undefined) {
            throw new Error('Required parameter tableName was null or undefined when calling dropTable.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/dropTable/${encodeURIComponent(String(tableName))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/hbaseconnector/enableTable/{tableName}
     * Service for enabling table
     * @param tableName Table name which must be enabled 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public enableTable(tableName: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public enableTable(tableName: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public enableTable(tableName: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public enableTable(tableName: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (tableName === null || tableName === undefined) {
            throw new Error('Required parameter tableName was null or undefined when calling enableTable.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.put<any>(`${this.basePath}/enableTable/${encodeURIComponent(String(tableName))}`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/hbaseconnector/insertData
     * Service for insert data
     * @param tableName 
     * @param rowKey 
     * @param columnFamily 
     * @param column 
     * @param cellValue 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public insertData(tableName?: string, rowKey?: string, columnFamily?: string, column?: string, cellValue?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public insertData(tableName?: string, rowKey?: string, columnFamily?: string, column?: string, cellValue?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public insertData(tableName?: string, rowKey?: string, columnFamily?: string, column?: string, cellValue?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public insertData(tableName?: string, rowKey?: string, columnFamily?: string, column?: string, cellValue?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {






        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/x-www-form-urlencoded'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (tableName !== undefined) {
            formParams = formParams.append('tableName', <any>tableName) || formParams;
        }
        if (rowKey !== undefined) {
            formParams = formParams.append('rowKey', <any>rowKey) || formParams;
        }
        if (columnFamily !== undefined) {
            formParams = formParams.append('columnFamily', <any>columnFamily) || formParams;
        }
        if (column !== undefined) {
            formParams = formParams.append('column', <any>column) || formParams;
        }
        if (cellValue !== undefined) {
            formParams = formParams.append('cellValue', <any>cellValue) || formParams;
        }

        return this.httpClient.put<any>(`${this.basePath}/insertData`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/hbaseconnector/scan
     * Service for scan data
     * @param tableName 
     * @param columnFamily 
     * @param column 
     * @param rowKeyLowerBound 
     * @param rowKeyUpperBound 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public scan(tableName?: string, columnFamily?: string, column?: string, rowKeyLowerBound?: string, rowKeyUpperBound?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public scan(tableName?: string, columnFamily?: string, column?: string, rowKeyLowerBound?: string, rowKeyUpperBound?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public scan(tableName?: string, columnFamily?: string, column?: string, rowKeyLowerBound?: string, rowKeyUpperBound?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public scan(tableName?: string, columnFamily?: string, column?: string, rowKeyLowerBound?: string, rowKeyUpperBound?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {






        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/x-www-form-urlencoded'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (tableName !== undefined) {
            formParams = formParams.append('tableName', <any>tableName) || formParams;
        }
        if (columnFamily !== undefined) {
            formParams = formParams.append('columnFamily', <any>columnFamily) || formParams;
        }
        if (column !== undefined) {
            formParams = formParams.append('column', <any>column) || formParams;
        }
        if (rowKeyLowerBound !== undefined) {
            formParams = formParams.append('rowKeyLowerBound', <any>rowKeyLowerBound) || formParams;
        }
        if (rowKeyUpperBound !== undefined) {
            formParams = formParams.append('rowKeyUpperBound', <any>rowKeyUpperBound) || formParams;
        }

        return this.httpClient.get<any>(`${this.basePath}/scan`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}