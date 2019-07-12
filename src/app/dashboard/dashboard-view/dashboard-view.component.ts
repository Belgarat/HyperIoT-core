import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Route } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { WidgetsLayoutComponent } from '../widgets-layout/widgets-layout.component';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
  private dashboardId: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dashboardId = this.route.snapshot.paramMap.get('id');
  }

}
