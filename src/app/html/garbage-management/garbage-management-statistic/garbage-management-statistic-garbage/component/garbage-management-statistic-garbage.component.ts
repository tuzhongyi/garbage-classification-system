import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class GarbageManagementStatisticGarbageComponent implements OnInit {
  constructor(private business: GarbageManagementStatisticGarbageBusiness) {}

  datas: GarbageManagementStatisticGarbageItem[] = [];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.business.load().then((x) => {
      this.datas = x;
    });
  }
}
