import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaChartComponent } from 'src/app/widgets/area-chart/area-chart.component';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  @ViewChild(AreaChartComponent) areaChartDemo: AreaChartComponent;

  constructor() { }

  ngOnInit() {
  }

  onPauseClick() {
    this.areaChartDemo.pause();
  }
  onPlayClick() {
    this.areaChartDemo.play();
  }

}
