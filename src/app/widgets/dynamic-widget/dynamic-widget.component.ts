import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-dynamic-widget',
  templateUrl: './dynamic-widget.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DynamicWidgetComponent implements OnInit {
  @Input()
  widget;

  constructor() { }

  ngOnInit() {
  }

}
