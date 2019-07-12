import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { DashboardwidgetsService } from 'projects/core/src/lib/hyperiot-client/dashboard-widgets-client/api-module';
import { DashboardsService } from 'projects/core/src/lib/hyperiot-client/dashboard-client/api-module';

@Injectable()
export class DashboardConfigService {
    configUrl = 'assets/data/dashboard-config-rest.json';
    testConfigUrl = 'assets/data/dashboard-config.json';

    constructor(
        private dashboardService: DashboardsService,
        private dashboardWidgetService: DashboardwidgetsService,
        private http: HttpClient
    ) { }

    getDashboardList() {
        return this.dashboardService.findAllDashboard_1();
    }

    getConfig(dashboardId: string) {
        if (dashboardId === 'demo') {
            return this.getTestConfig();
        }
        const subject = this.dashboardWidgetService.findAllDashboardWidget_1(+dashboardId)
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
