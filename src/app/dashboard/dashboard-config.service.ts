import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardConfigService {
    constructor(private http: HttpClient) { }
    configUrl = 'assets/dashboard-config.json';

    getConfig() {
        return this.http.get(this.configUrl);
    }
}
