/**
 * HyperIoT Area
 * HyperIoT Area API
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

import { Area } from '../../../models/area';
import { AreaDevice } from '../../../models/areaDevice';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../../../models/configuration';


@Injectable()
export class AreasService {

    protected basePath = '/hyperiot/areas';
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
     * /hyperiot/areas/{id}/devices/{areaDevice}
     * Adds or updates an area device
     * @param id id of the area
     * @param body the area device
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addAreaDevice(id: number, body: AreaDevice, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public addAreaDevice(id: number, body: AreaDevice, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public addAreaDevice(id: number, body: AreaDevice, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public addAreaDevice(id: number, body: AreaDevice, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling addAreaDevice.');
        }

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addAreaDevice.');
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
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/${encodeURIComponent(String(id))}/devices`,
            body,
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
     * /hyperiot/areas/{id}
     * Service for deleting a area entity
     * @param id The area id which must be deleted
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteArea(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteArea(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteArea(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteArea(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteArea.');
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

        return this.httpClient.delete<any>(`${this.basePath}/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/areas/all
     * Service for finding all area entities
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllArea(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findAllArea(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findAllArea(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findAllArea(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<any>(`${this.basePath}/all`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/areas
     * Service for finding all area entities
     * @param delta 
     * @param page 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllAreaPaginated(delta?: number, page?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findAllAreaPaginated(delta?: number, page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findAllAreaPaginated(delta?: number, page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findAllAreaPaginated(delta?: number, page?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (delta !== undefined && delta !== null) {
            queryParameters = queryParameters.set('delta', <any>delta);
        }
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
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
        ];

        return this.httpClient.get<any>(`${this.basePath}/`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/areas/{id}
     * Service for finding area
     * @param id id from which area object will retrieve
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findArea(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findArea(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findArea(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findArea(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling findArea.');
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
        ];

        return this.httpClient.get<any>(`${this.basePath}/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/areas/{id}/tree
     * Service for finding inner areas
     * @param id id of parent area
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findInnerAreas(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findInnerAreas(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findInnerAreas(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findInnerAreas(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling findInnerAreas.');
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
        ];

        return this.httpClient.get<any>(`${this.basePath}/${encodeURIComponent(String(id))}/tree`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/areas/{id}/devices
     * Return the list of devices in an area
     * @param id id of the area
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAreaDeviceList(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getAreaDeviceList(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getAreaDeviceList(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getAreaDeviceList(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getAreaDeviceList.');
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
        ];

        return this.httpClient.get<any>(`${this.basePath}/${encodeURIComponent(String(id))}/devices`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/areas/{id}/devices/{areaDeviceId}
     * Deletes an area device
     * @param id id of the area
     * @param areaDeviceId id of the area device
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public removeAreaDevice(id: number, areaDeviceId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public removeAreaDevice(id: number, areaDeviceId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public removeAreaDevice(id: number, areaDeviceId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public removeAreaDevice(id: number, areaDeviceId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling removeAreaDevice.');
        }

        if (areaDeviceId === null || areaDeviceId === undefined) {
            throw new Error('Required parameter areaDeviceId was null or undefined when calling removeAreaDevice.');
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
        ];

        return this.httpClient.delete<any>(`${this.basePath}/${encodeURIComponent(String(id))}/devices/${encodeURIComponent(String(areaDeviceId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/areas
     * Service for adding a new area entity
     * @param body Area entity which must be saved 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveArea(body: Area, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public saveArea(body: Area, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public saveArea(body: Area, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public saveArea(body: Area, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveArea.');
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
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/areas/{id}/image
     * Service to unset the area background image
     * @param id The area id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public unsetAreaImage(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public unsetAreaImage(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public unsetAreaImage(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public unsetAreaImage(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling unsetAreaImage.');
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
        ];

        return this.httpClient.post<any>(`${this.basePath}/${encodeURIComponent(String(id))}/image`,
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
     * /hyperiot/areas
     * Service for updating a area entity
     * @param body Area entity which must be updated 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateArea(body: Area, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateArea(body: Area, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateArea(body: Area, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateArea(body: Area, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateArea.');
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
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
