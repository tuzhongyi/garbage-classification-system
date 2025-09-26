import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PicturePolygonMultipleComponent } from '../../../../../common/components/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { IEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { Language } from '../../../../../common/tools/language';
import { EventHandleCompleteLineComponent } from '../event-handle-complete-line/event-handle-complete-line.component';
import { EventHandleCompleteBusiness } from './event-handle-complete.business';
import {
  EventHandleCompleteImageArgs,
  EventHandleCompleteModel,
  EventHandleCompleteModelType,
  EventRecordCompleteModel,
} from './event-handle-complete.model';
import { EventHandleCompleteProvider } from './event-handle-complete.provider';

@Component({
  selector: 'event-handle-complete',
  imports: [
    CommonModule,
    PicturePolygonMultipleComponent,
    EventHandleCompleteLineComponent,
  ],
  templateUrl: './event-handle-complete.component.html',
  styleUrls: ['./event-handle-complete.component.less'],
  providers: [...EventHandleCompleteProvider],
})
export class EventHandleCompleteComponent implements OnInit, OnChanges {
  @Output() image: EventEmitter<EventHandleCompleteImageArgs> =
    new EventEmitter();

  @Input() data?: IEventRecord;
  @Input() index?: number;
  @Input() first?: boolean;
  @Input() last?: boolean;
  @Output() next: EventEmitter<number> = new EventEmitter();
  @Output() prev: EventEmitter<number> = new EventEmitter();
  // @Input() load?: EventEmitter<IEventRecord>;

  constructor(private business: EventHandleCompleteBusiness) {}

  model?: EventRecordCompleteModel;

  CompleteType = EventHandleCompleteModelType;
  Language = Language;
  scroll = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.loadData(this.data);
    }
  }

  ngOnInit(): void {}

  onscroll(e: Event) {
    let target = e.currentTarget as HTMLDivElement;

    let items = document.querySelectorAll('.complete-item-images');
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.id === target.id) {
        continue;
      }
      item.scrollLeft = target.scrollLeft;
    }
  }

  async loadData(data: IEventRecord) {
    return this.business.load(data).then((x) => {
      this.model = x;
    });
  }

  onimage(item: EventHandleCompleteModel, index: number) {
    this.image.emit({
      model: item,
      index: index,
    });
  }
  onnext() {
    this.next.emit(this.index);
  }
  onprev() {
    this.prev.emit(this.index);
  }
}
