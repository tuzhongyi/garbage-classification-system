import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { IasDevice } from '../../../../../common/network/model/ias/ias-device.model';
import { GarbageManagementManagerIndex } from '../../../garbage-management-manager/garbage-management-manager.model';
import { GarbageManagementStatisticStationItemComponent } from '../garbage-management-statistic-station-item/garbage-management-statistic-station-item.component';
import {
  GarbageManagementStatisticRecordIcon,
  GarbageManagementStatisticStationItem,
} from '../garbage-management-statistic-station-item/garbage-management-statistic-station-item.model';
import { GarbageManagementStatisticStationBusiness } from './garbage-management-statistic-station.business';

@Component({
  selector: 'howell-garbage-management-statistic-station',
  imports: [CommonModule, GarbageManagementStatisticStationItemComponent],
  templateUrl: './garbage-management-statistic-station.component.html',
  styleUrl: './garbage-management-statistic-station.component.less',
  providers: [GarbageManagementStatisticStationBusiness],
})
export class GarbageManagementStatisticStationComponent
  implements OnInit, OnChanges
{
  @Input() index = GarbageManagementManagerIndex.home;
  @Input() stations: GarbageStation[] = [];
  @Input() devices: IasDevice[] = [];

  constructor(private business: GarbageManagementStatisticStationBusiness) {}

  datas: Map<
    GarbageManagementStatisticRecordIcon,
    GarbageManagementStatisticStationItem
  > = new Map();

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.change.index(changes['index']);
    this.change.stations(changes['stations']);
    this.change.devices(changes['devices']);
  }
  private change = {
    index: (simple: SimpleChange) => {
      if (simple) {
        this.display();
      }
    },
    stations: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.station(this.stations);

        this.display();
      }
    },
    devices: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.device(this.devices);

        this.display();
      }
    },
  };

  private load = {
    station: (datas: GarbageStation[]) => {
      let items = this.business.stations(datas);
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        this.datas.set(item.icon, item);
      }
    },
    device: (datas: IasDevice[]) => {
      let item = this.business.devices(datas);
      this.datas.set(item.icon, item);
    },
  };

  private display() {
    this.datas.forEach((x) => {
      switch (this.index) {
        case GarbageManagementManagerIndex.home:
          x.show = true;
          break;
        case GarbageManagementManagerIndex.mixedinto:
          x.show = x.icon === GarbageManagementStatisticRecordIcon.mixedinto;
          break;
        case GarbageManagementManagerIndex.garbagedrop:
          x.show = x.icon === GarbageManagementStatisticRecordIcon.illegaldrop;
          break;
        case GarbageManagementManagerIndex.vehicle:
          x.show =
            x.icon === GarbageManagementStatisticRecordIcon.illegalvehicle;
          break;
        case GarbageManagementManagerIndex.street:
          x.show = x.icon === GarbageManagementStatisticRecordIcon.street;
          break;
        default:
          break;
      }
    });
  }
}
