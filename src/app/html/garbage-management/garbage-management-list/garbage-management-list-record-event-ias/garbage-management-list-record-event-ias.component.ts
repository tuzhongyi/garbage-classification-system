import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { IasEventRecord } from '../../../../common/network/model/ias/ias-event-record.model';
import { GarbageManagementListRecordEventIasBusiness } from './garbage-management-list-record-event-ias.business';
import { GarbageManagementListRecordEventIasArgs } from './garbage-management-list-record-event-ias.model';

@Component({
  selector: 'howell-garbage-management-list-record-event-ias',
  imports: [CommonModule],
  templateUrl: './garbage-management-list-record-event-ias.component.html',
  styleUrl: './garbage-management-list-record-event-ias.component.less',
  providers: [GarbageManagementListRecordEventIasBusiness],
})
export class GarbageManagementListRecordEventIasComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<GarbageManagementListRecordEventIasArgs>;
  @Input() unit = TimeUnit.Day;
  @Output() loaded = new EventEmitter<IasEventRecord[]>();
  @Output() task = new EventEmitter<IasEventRecord>();
  @Output() itemclick = new EventEmitter<IasEventRecord>();
  constructor(private business: GarbageManagementListRecordEventIasBusiness) {}

  datas: IasEventRecord[] = [];
  private args: GarbageManagementListRecordEventIasArgs = {};
  private subscription = new Subscription();
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.args = x ?? {};
        this.load(this.args);
      });
      this.subscription.add(sub);
    }
  }

  ngOnInit(): void {
    this.regist();
    this.load(this.args);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(args: GarbageManagementListRecordEventIasArgs) {
    this.business
      .load(this.unit, args)
      .then((x) => {
        this.datas = x;
        this.loaded.emit(x);
      })
      .catch((x) => {
        this.loaded.emit([]);
      });
  }

  on = {
    task: (item: IasEventRecord) => {
      this.task.emit(item);
    },
    click: (item: IasEventRecord) => {
      this.itemclick.emit(item);
    },
  };
}
