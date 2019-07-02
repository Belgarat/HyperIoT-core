import { Component, OnDestroy } from '@angular/core';

import { ChannelData, DataChannelService } from '../services/data-channel.service';
import { DataPacket } from './data/data-packet';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'hyperiot-widget',
  template: ''
})
export class WidgetComponent implements OnDestroy {
  protected dataChannel: ChannelData;

  constructor(public dataChannelService: DataChannelService) { }

  ngOnDestroy() {
    // clean up event and subject subscriptions
    this.unsubscribeDataChannel();
  }

  /**
   * Set the data channel stream the widget will receive data from
   *
   * @param widgetId The widget id
   * @param packetFilter Packet id and data filters (only listed fields will be streamed to the widget)
   * @param observerCallback Callback to fire once new data is received
   */
  setDataChannel(widgetId: string, packetFilter: DataPacket, observerCallback: PartialObserver<[any, any]> | any) {
    this.unsubscribeDataChannel();
    this.dataChannel = this.dataChannelService.addDataChannel(widgetId, packetFilter);
    this.dataChannel.subject.subscribe(observerCallback);
  }

  /**
   * Stops receiving data from the subscribed data channel
   */
  private unsubscribeDataChannel() {
    if (this.dataChannel != null) {
      this.dataChannel.subject.unsubscribe();
    }
  }
}
