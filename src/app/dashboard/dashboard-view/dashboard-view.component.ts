import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
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
    // private route: ActivatedRoute,
    // private router: Route
  ) { }

  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.dashboardId = params.get('id')
    //   )
    // );
  }

}
