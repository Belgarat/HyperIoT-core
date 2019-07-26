/**
 * HyperIoT DashboardWidget
 * HyperIoT DashboardWidget API
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

import { DashboardWidget } from '../../../models/dashboardWidget';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../../../models/configuration';


@Injectable()
export class DashboardwidgetsService {

    protected basePath = '/hyperiot/dashboardwidgets';
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
     * /hyperiot/dashboardwidgets/{id}
     * Service for deleting a dashboardwidget entity
     * @param id The dashboardwidget id which must be deleted
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteDashboardWidget(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteDashboardWidget(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteDashboardWidget(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteDashboardWidget(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteDashboardWidget.');
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
     * /hyperiot/dashboardwidgets/all
     * Service for finding all dashboardwidget entities
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllDashboardWidget(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findAllDashboardWidget(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findAllDashboardWidget(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findAllDashboardWidget(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
     * /hyperiot/dashboardwidgets/configuration/all/{dashboardId}
     * Service for finding all dashboard widget inside a dashboard
     * @param dashboardId dashboard id from which dashboard widgets will retrieve
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllDashboardWidgetInDashboard(dashboardId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findAllDashboardWidgetInDashboard(dashboardId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findAllDashboardWidgetInDashboard(dashboardId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findAllDashboardWidgetInDashboard(dashboardId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dashboardId === null || dashboardId === undefined) {
            throw new Error('Required parameter dashboardId was null or undefined when calling findAllDashboardWidgetInDashboard.');
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

        return this.httpClient.get<any>(`${this.basePath}/all/${encodeURIComponent(String(dashboardId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/dashboardwidgets
     * Service for finding all dashboardwidget entities
     * @param delta 
     * @param page 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllDashboardWidgetPaginated(delta?: number, page?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findAllDashboardWidgetPaginated(delta?: number, page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findAllDashboardWidgetPaginated(delta?: number, page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findAllDashboardWidgetPaginated(delta?: number, page?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



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
     * /hyperiot/dashboardwidgets/{id}
     * Service for finding dashboardwidget
     * @param id id from which DashboardWidget object will retrieve
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findDashboardWidget(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findDashboardWidget(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findDashboardWidget(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findDashboardWidget(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling findDashboardWidget.');
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
     * /hyperiot/dashboardwidgets/configuration/{dashboardWidgetId}
     * Get dashboard widget configuration
     * @param dashboardWidgetId dashboard widget id from which configuration will retrieve
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findDashboardWidgetConf(dashboardWidgetId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findDashboardWidgetConf(dashboardWidgetId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findDashboardWidgetConf(dashboardWidgetId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findDashboardWidgetConf(dashboardWidgetId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dashboardWidgetId === null || dashboardWidgetId === undefined) {
            throw new Error('Required parameter dashboardWidgetId was null or undefined when calling findDashboardWidgetConf.');
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

        return this.httpClient.get<any>(`${this.basePath}/configuration/${encodeURIComponent(String(dashboardWidgetId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/dashboardwidgets/configuration/all/{dashboardId}
     * Updates all widgets configuration of the dashboard with the given id
     * @param dashboardId dashboard id
     * @param body dashboard configuration
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveAllDashboardWidget(dashboardId: number, body: Array<DashboardWidget>, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public saveAllDashboardWidget(dashboardId: number, body: Array<DashboardWidget>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public saveAllDashboardWidget(dashboardId: number, body: Array<DashboardWidget>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public saveAllDashboardWidget(dashboardId: number, body: Array<DashboardWidget>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dashboardId === null || dashboardId === undefined) {
            throw new Error('Required parameter dashboardId was null or undefined when calling saveAllDashboardWidget.');
        }

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveAllDashboardWidget.');
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

        return this.httpClient.put<any>(`${this.basePath}/configuration/all/${encodeURIComponent(String(dashboardId))}`,
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
     * /hyperiot/dashboardwidgets
     * Service for adding a new dashboardwidget entity
     * @param body DashboardWidget entity which must be saved 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveDashboardWidget(body: DashboardWidget, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public saveDashboardWidget(body: DashboardWidget, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public saveDashboardWidget(body: DashboardWidget, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public saveDashboardWidget(body: DashboardWidget, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveDashboardWidget.');
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
     * /hyperiot/dashboardwidgets/configuration
     * Service for updating a dashboard widget configuration
     * @param dashboardWidgetId dashboard widget id from which configuration will saved
     * @param body new dashboard widget configuration in JSON format
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public setDashboardWidgetConf(dashboardWidgetId: number, body: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public setDashboardWidgetConf(dashboardWidgetId: number, body: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public setDashboardWidgetConf(dashboardWidgetId: number, body: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public setDashboardWidgetConf(dashboardWidgetId: number, body: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dashboardWidgetId === null || dashboardWidgetId === undefined) {
            throw new Error('Required parameter dashboardWidgetId was null or undefined when calling setDashboardWidgetConf.');
        }

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling setDashboardWidgetConf.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (dashboardWidgetId !== undefined && dashboardWidgetId !== null) {
            queryParameters = queryParameters.set('dashboardWidgetId', <any>dashboardWidgetId);
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

        return this.httpClient.put<any>(`${this.basePath}/configuration`,
            body,
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
     * /hyperiot/dashboardwidgets
     * Service for updating a dashboardwidget entity
     * @param body DashboardWidget entity which must be updated 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateDashboardWidget(body: DashboardWidget, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateDashboardWidget(body: DashboardWidget, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateDashboardWidget(body: DashboardWidget, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateDashboardWidget(body: DashboardWidget, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateDashboardWidget.');
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
