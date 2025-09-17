import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GarbageManagementStatisticGarbageItemComponent } from '../garbage-management-statistic-garbage-item/garbage-management-statistic-garbage-item.component';
import { GarbageManagementStatisticGarbageItem } from '../garbage-management-statistic-garbage-item/garbage-management-statistic-garbage-item.model';
import { GarbageManagementStatisticGarbageBusiness } from './business/garbage-management-statistic-garbage.business';

@Component({
  selector: 'howell-garbage-management-statistic-garbage',
  imports: [CommonModule, GarbageManagementStatisticGarbageItemComponent],
  templateUrl: './garbage-management-statistic-garbage.component.html',
  styleUrl: './garbage-management-statistic-garbage.component.less',
  providers: [GarbageManagementStatisticGarbageBusiness],
})
export class GarbageManagementStatisticGarbageComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  constructor(private business: GarbageManagementStatisticGarbageBusiness) {}

  datas: GarbageManagementStatisticGarbageItem[] = [];
  private subscription = new Subscription();
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe(() => {
        this.load();
      });
      this.subscription.add(sub);
    }
  }

  ngOnInit(): void {
    this.regist();
    this.load();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load() {
    this.business.load().then((x) => {
      this.datas = x;
    });
  }
}
