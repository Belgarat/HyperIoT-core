import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable()
export class DashboardConfigService {
    constructor(private http: HttpClient) { }
    configUrl = 'assets/data/dashboard-config-rest.json';
    testConfigUrl = 'assets/data/dashboard-config.json';

    getConfig() {
        const subject = this.http.get(this.configUrl)
            .pipe(
                map(
                    (data: any[]) => {
                        const config = [];
                        // Normalize data received from server
                        data.map((w) => {
                            const widget = JSON.parse(w.widgetConf);
                            widget.id = w.widgetId;
                            config.push(widget);
                        });
                        return config;
                    },
                    error => console.log(error)
                )
            );
        return subject;
    }
    getTestConfig() {
        return this.http.get(this.testConfigUrl);
    }
}
