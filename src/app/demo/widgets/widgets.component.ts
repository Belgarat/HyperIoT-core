import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private dataStreamService: DataStreamService) { }

  ngOnInit() {
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

}
