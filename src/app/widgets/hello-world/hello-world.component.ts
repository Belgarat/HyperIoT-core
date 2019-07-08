import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['../../../assets/widgets/styles/widget-commons.css', './hello-world.component.css']
})
export class HelloWorldComponent implements OnInit, OnDestroy {
  @Input()
  widget;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
