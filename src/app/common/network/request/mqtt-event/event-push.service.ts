import { EventEmitter, Injectable } from '@angular/core';
import { IllegalDropEventRecord } from '../../model/garbage-station/event-record/illegal-drop-event-record.model';

@Injectable({
  providedIn: 'root',
})
export class EventPushService {
  pushIllegalDrop: EventEmitter<IllegalDropEventRecord>;
  connectionState: EventEmitter<boolean>;
  constructor() {
    this.pushIllegalDrop = new EventEmitter<IllegalDropEventRecord>();
    this.connectionState = new EventEmitter<boolean>();
  }
}
