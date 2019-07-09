import { Component, OnInit, Input } from '@angular/core';

import { GridsterConfig, GridsterItem, GridType, DisplayGrid, CompactType } from 'angular-gridster2';

import { DataStreamService } from 'projects/core/src/lib/hyperiot-base/hyperiot-base.module';
import { DashboardConfigService } from '../dashboard-config.service';

@Component({
  selector: 'app-widgets-layout',
  templateUrl: './widgets-layout.component.html',
  styleUrls: ['./widgets-layout.component.css']
})
export class WidgetsLayoutComponent implements OnInit {
  @Input() options: GridsterConfig;

  dragEnabled = true;
  dashboard: Array<GridsterItem>;

  static itemChange(item, itemComponent) {
    if (typeof item.change === 'function') {
      item.change();
    }
  }

  static itemResize(item, itemComponent) {
    if (typeof item.resize === 'function') {
      item.resize();
    }
  }

  /**
   * This is a demo dashboard for testing widgets
   *
   * @param dataStreamService Injected DataStreamService
   * @param httpClient Injected HTTP client
   */
  constructor(
    private dataStreamService: DataStreamService,
    private configService: DashboardConfigService
  ) { }

  ngOnInit() {
    this.options = {
      itemChangeCallback: WidgetsLayoutComponent.itemChange,
      itemResizeCallback: WidgetsLayoutComponent.itemResize,
      gridType: GridType.Fit,
      compactType: CompactType.CompactUp,
      displayGrid: DisplayGrid.OnDragAndResize,
      disableWindowResize: true,
      scrollToNewItems: false,
      disableWarnings: true,
      ignoreMarginInRow: false,
      minCols: 8,
      maxCols: 8,
      minRows: 4,
      maxRows: 100,
      draggable: {
        enabled: this.dragEnabled,
        dropOverItems: true,
        dragHandleClass: 'drag-handle',
        ignoreContent: true
      },
      swap: false,
      disableScrollHorizontal: true,
      disableScrollVertical: false,
      pushItems: true,
      resizable: {
        enabled: false
      }
    };
    this.dashboard = [];
    this.configService.getConfig().subscribe((c: Array<GridsterItem>) => {
      console.log(c);
      this.dashboard = c;
    });
    // TODO: the connection should happen somewhere else in the main page
    this.dataStreamService.connect();
  }

  onToggleDragging() {
    this.dragEnabled = !this.dragEnabled;
    this.options.draggable.enabled = this.dragEnabled;
    this.options.api.optionsChanged();
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
