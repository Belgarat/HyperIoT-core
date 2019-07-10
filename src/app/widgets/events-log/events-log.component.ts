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
  @ViewChild('log', { static: true }) private log: ElementRef;

  private encapsulationId: string;
  /**
   * Contructor
   * @param dataStreamService Inject data stream service
   */
  constructor(private hostElement: ElementRef, private dataStreamService: DataStreamService) {
    const hel = hostElement.nativeElement;
    for (let j = 0; j < hel.attributes.length; j++) {
      const a = hel.attributes[j];
      if (a.name.indexOf('_nghost-') === 0) {
        this.encapsulationId = a.name.replace('_nghost-', '_ngcontent-');
        break;
      }
    }
  }

  ngOnInit() {
    this.dataStreamService.eventStream.subscribe((event) => {
      let packet = JSON.parse(event.data);
      // packet = JSON.parse(packet.payload);
      const rowHtml = `
        <div ${this.encapsulationId} class="time">
          ${new Date().toLocaleTimeString()}
        </div>
        <div ${this.encapsulationId} class="message">
          ${packet.payload}
        </div>
        <div ${this.encapsulationId} class="extra">
          ---
        </div>
      `;
      // limit max log lines
      let maxLogLines = 100;
      if (this.widget.config && this.widget.config.maxLogLines) {
        maxLogLines = +this.widget.config.maxLogLines;
      }
      const logdiv = this.log.nativeElement; 
      while (logdiv.childNodes.length / 3 > maxLogLines) {
        const logLine = logdiv.childNodes[logdiv.childNodes.length - 1];
        logdiv.removeChild(logLine);
      }
      this.log.nativeElement
        .insertAdjacentHTML('afterbegin', rowHtml);
    });
  }

  ngOnDestroy() {
  }

}
