import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { DataStreamService } from 'projects/core/src/lib/hyperiot-base/hyperiot-base.module';

@Component({
  selector: 'app-events-log',
  templateUrl: './events-log.component.html',
  styleUrls: ['../../../assets/widgets/styles/widget-commons.css', './events-log.component.css']
})
export class EventsLogComponent implements OnInit, OnDestroy {
  @Input()
  widget;
  @ViewChild('log') private log: ElementRef;

  /**
   * Contructor
   * @param dataStreamService Inject data stream service
   */
  constructor(private dataStreamService: DataStreamService) { }

  ngOnInit() {
    this.dataStreamService.eventStream.subscribe((event) => {
      let packet = JSON.parse(event.data);
      // packet = JSON.parse(packet.payload);
      const rowHtml = `
        <span class="time">
          ${new Date().toLocaleTimeString()}
        </span>
        <span class="message">
          ${packet.payload}
        </span>
        <span class="extra">
          ---
        </span>
      `;
      this.log.nativeElement
        .insertAdjacentHTML('afterbegin', rowHtml);
    });
  }

  ngOnDestroy() {
  }

}
