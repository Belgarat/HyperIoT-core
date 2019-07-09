import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-text-label',
  templateUrl: './text-label.component.html',
  styleUrls: ['../../../assets/widgets/styles/widget-commons.css', './text-label.component.css']
})
export class TextLabelComponent implements OnInit, OnDestroy {
  @Input()
  widget;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
