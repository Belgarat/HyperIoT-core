import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { GridsterConfig, GridsterItem } from 'angular-gridster2';

import { AreaChartComponent } from 'src/app/widgets/area-chart/area-chart.component';
import { DataStreamService } from 'projects/core/src/lib/hyperiot-base/hyperiot-base.module';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  @ViewChild('areaChart1') areaChart1: AreaChartComponent;
  @ViewChild('areaChart2') areaChart2: AreaChartComponent;

  @Input() options: GridsterConfig;

  private startDate = new Date();
  dashboard: Array<GridsterItem>;

  static itemChange(item, itemComponent) {
    console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.log('itemResized', item, itemComponent);
  }

  /**
   * This is a demo dashboard for testing widgets
   *
   * @param dataStreamService Injected DataStreamService
   */
  constructor(private dataStreamService: DataStreamService) { }

  ngOnInit() {
    this.options = {
      itemChangeCallback: WidgetsComponent.itemChange,
      itemResizeCallback: WidgetsComponent.itemResize,
      minCols: 8,
      maxCols: 8,
      minRows: 8,
      maxRows: 8,
      draggable: {
        enabled: true,
        dropOverItems: true
      },
      swap: false,
      disableScrollHorizontal: true,
      pushItems: true,
      resizable: {
        enabled: false
      }
    };
    this.dashboard = [
      {cols: 4, rows: 4, y: 0, x: 0},
      {cols: 4, rows: 4, y: 0, x: 4}
    ];
    // TODO: the connection should happen somewhere else in the main page
    this.dataStreamService.connect();
  }

  onPauseClick() {
    this.areaChart1.pause();
    this.areaChart2.pause();
  }
  onPlayClick() {
    this.areaChart1.play();
    this.areaChart2.play();
  }

  // Gridster methods

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    // this.dashboard.push({ });
  }

}
