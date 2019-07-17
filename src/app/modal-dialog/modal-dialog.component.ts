import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { HPacket } from 'projects/core/src/lib/hyperiot-client/models/hPacket';
import { HpacketsService } from 'projects/core/src/lib/hyperiot-client/h-packet-client/api-module';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit, OnDestroy {
  public projectPackets: HPacket[] = [];
  constructor(
    private viewContainer: ElementRef,
    private packetService: HpacketsService
  ) { }

  ngOnInit() {
    this.viewContainer.nativeElement.addEventListener('click', this.dismiss.bind(this));
    this.packetService
        .findAllHPacket_1()
        .subscribe((packetList) => this.projectPackets = packetList);
    this.close();
  }
  ngOnDestroy() {
    this.viewContainer.nativeElement.removeEventListener('click', this.dismiss.bind(this));
  }

  open() {
    this.viewContainer.nativeElement.style.display = '';
  }

  close() {
    this.viewContainer.nativeElement.style.display = 'none';
  }

  dismiss(e: any) {
    if (e.target === this.viewContainer.nativeElement) {
      this.close();
    }
  }

}
