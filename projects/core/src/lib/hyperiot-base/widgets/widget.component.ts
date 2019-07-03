import { Component, OnDestroy } from '@angular/core';

import { DataChannel, DataStreamService } from '../services/data-stream.service';
import { DataPacketFilter } from './data/data-packet-filter';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'hyperiot-widget',
  template: ''
})
export class WidgetComponent implements OnDestroy {
  protected dataChannel: DataChannel;
  widgetId: string;

  /**
   * Contructor
   * @param dataStreamService Inject data stream service
   */
  constructor(public dataStreamService: DataStreamService) { }

  ngOnDestroy() {
    // clean up event and subject subscriptions
    this.unsubscribeRealTimeStream();
  }

  // TODO: implement methods for getting offline data as well

  /**
   * Set the real-time data stream the widget will receive data from
   *
   * @param widgetId The widget id
   * @param packetFilter Packet id and data filters (only listed fields will be streamed to the widget)
   * @param observerCallback Callback to fire once new data is received
   */
  subscribeRealTimeStream(packetFilter: DataPacketFilter, observerCallback: PartialObserver<[any, any]> | any) {
    this.unsubscribeRealTimeStream();
    this.dataChannel = this.dataStreamService.addDataStream(this.widgetId, packetFilter);
    this.dataChannel.subject.subscribe(observerCallback);
  }

  /**
   * Stops receiving data from the subscribed data stream
   */
  private unsubscribeRealTimeStream() {
    if (this.dataChannel != null) {
      // TODO: maybe move the unsubscription inside the DataStreamService::removeDataChannel
      this.dataChannel.subject.unsubscribe();
      this.dataStreamService.removeDataChannel(this.widgetId);
    }
  }
}
