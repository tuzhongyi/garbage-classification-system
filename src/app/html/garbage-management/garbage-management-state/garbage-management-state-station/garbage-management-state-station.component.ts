import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { EventType } from '../../../../common/enum/event-type.enum';
import { StationState } from '../../../../common/enum/station-state.enum';
import { GarbageStationViewModel } from '../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementManagerIndex } from '../../garbage-management-manager/garbage-management-manager.model';
import { GarbageManagementStateItemComponent } from '../garbage-management-state-item/garbage-management-state-item.component';
import {
  GarbageManagementStateItem,
  GarbageManagementStateItemColor,
} from '../garbage-management-state-item/garbage-management-state-item.model';
import { GarbageManagementStateStationBusiness } from './garbage-management-state-station.business';

@Component({
  selector: 'howell-garbage-management-state-station',
  imports: [CommonModule, GarbageManagementStateItemComponent],
  templateUrl: './garbage-management-state-station.component.html',
  styleUrl: './garbage-management-state-station.component.less',
  providers: [GarbageManagementStateStationBusiness],
})
export class GarbageManagementStateStationComponent implements OnChanges {
  @Input() stations: GarbageStationViewModel[] = [];
  @Input() index = GarbageManagementManagerIndex.home;
  @Input() eventables: EventType[] = [];

  @Input() selected: StationState[] = [];
  @Output() selectedChange = new EventEmitter<StationState[]>();

  constructor(private business: GarbageManagementStateStationBusiness) {}

  datas: GarbageManagementStateItem[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.change.index(changes['index']);
    this.change.stations(changes['stations']);
  }
  private change = {
    stations: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.stations);
        this.display();
      }
    },
    index: (simple: SimpleChange) => {
      if (simple) {
        this.load(this.stations);
        this.display();
      }
    },
  };

  private load(datas: GarbageStationViewModel[]) {
    let _datas = this.business.filter(this.index, datas);
    this.datas = this.business.load(_datas, this.eventables);
    this.selected = this.datas.map((x) => x.state);
  }

  private display() {
    let icons = [
      GarbageManagementStateItemColor.green,
      GarbageManagementStateItemColor.purple,
      GarbageManagementStateItemColor.yellow,
      GarbageManagementStateItemColor.gray,
    ];
    this.datas.forEach((x) => {
      switch (this.index) {
        case GarbageManagementManagerIndex.home:
          x.show = true;
          break;
        case GarbageManagementManagerIndex.mixedinto:
          icons = [
            GarbageManagementStateItemColor.green,
            GarbageManagementStateItemColor.purple,
            GarbageManagementStateItemColor.gray,
          ];
          x.show = icons.includes(x.color);
          break;
        case GarbageManagementManagerIndex.garbagedrop:
          icons = [
            GarbageManagementStateItemColor.green,
            GarbageManagementStateItemColor.yellow,
            GarbageManagementStateItemColor.gray,
          ];
          x.show = icons.includes(x.color);
          break;
        case GarbageManagementManagerIndex.vehicle:
          icons = [
            GarbageManagementStateItemColor.green,
            GarbageManagementStateItemColor.purple,
            GarbageManagementStateItemColor.gray,
          ];
          x.show = x.show = icons.includes(x.color);

          break;
        case GarbageManagementManagerIndex.street:
          x.show = false;
          break;
        default:
          break;
      }
    });
  }
  on = {
    select: (item: StationState) => {
      let index = this.selected.indexOf(item);
      if (index > -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(item);
      }
      this.selectedChange.emit(this.selected);
    },
  };
}
