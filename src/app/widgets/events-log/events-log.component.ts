import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-events-log',
  templateUrl: './events-log.component.html',
  styleUrls: ['./events-log.component.css']
})
export class EventsLogComponent implements OnInit, OnDestroy {
  @Input()
  widget;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
