import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { EventType } from '../../../common/enum/event-type.enum';
import { IDivision } from '../../../common/network/model/garbage-station/division.model';
import { IasDevice } from '../../../common/network/model/ias/ias-device.model';
import { IasEventRecord } from '../../../common/network/model/ias/ias-event-record.model';
import { GarbageStationViewModel } from '../../../common/view-model/garbage-station.view-model';
import { GarbageManagementMapBusiness } from './business/garbage-management-map.business';
import { GarbageManagementMapController } from './controller/garbage-management-map.controller';
import { GarbageManagementMapProviders } from './garbage-management-map.provider';

@Component({
  selector: 'howell-garbage-management-map',
  imports: [],
  templateUrl: './garbage-management-map.component.html',
  styleUrl: './garbage-management-map.component.less',
  providers: [...GarbageManagementMapProviders],
})
export class GarbageManagementMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() devices: IasDevice[] = [];
  @Input() stations: GarbageStationViewModel[] = [];
  @Input() records: IasEventRecord[] = [];
  @Input() eventables = [EventType.GarbageFull, EventType.GarbageDrop];
  @Input() select?: EventEmitter<IDivision>;
  @Output() recorddblclick = new EventEmitter<IasEventRecord>();
  constructor(
    public controller: GarbageManagementMapController,
    private business: GarbageManagementMapBusiness
  ) {}
  private subscription = new Subscription();
  private regist = {
    input: () => {
      if (this.select) {
        let sub = this.select.subscribe((division) => {
          this.controller.division.select(division.Id);

          this.business.map.default.get().then((x) => {
            if (x.Id === division.Id) {
              this.controller.fit();
            } else {
              this.business.map.get(division.Id).then((x) => {
                if (x) {
                  this.controller.move([x.center.lon, x.center.lat]);
                }
              });
            }
          });
        });
        this.subscription.add(sub);
      }
    },
    output: () => {
      this.controller.record.event.dblclick.subscribe((data) => {
        this.recorddblclick.emit(data);
      });
    },
  };

  private change = {
    stations: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.station(this.stations);
      }
    },
    devices: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.device(this.devices);
      }
    },
    records: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.record(this.records);
      }
    },
    eventables: (simple: SimpleChange) => {
      if (simple) {
        this.load.eventables(this.eventables);
      }
    },
  };
  private load = {
    division: async () => {
      let data = {
        root: await this.business.map.current(),
        grid: await this.business.grid.load(),
        children: await this.business.division.load(),
      };

      let datas = await this.business.map.datas.get();
      let ids = data.grid.map((x) => x.Id);
      let grids = datas.filter((x) => ids.includes(x.id));
      this.controller.root.load(data.root, grids);

      this.controller.move([data.root.center.lon, data.root.center.lat]);
      // this.controller.fit();
      this.business.map.array(data.children.map((x) => x.Id)).then((datas) => {
        if (datas) {
          this.controller.division.load(datas);
        }
      });
    },
    station: (datas: GarbageStationViewModel[]) => {
      this.controller.station.load(datas);
    },
    eventables: (datas: EventType[]) => {
      this.controller.station.eventable(datas);
    },
    device: (datas: IasDevice[]) => {
      this.controller.device.load(datas);
    },
    record: (datas: IasEventRecord[]) => {
      this.controller.record.load(datas);
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.eventables(changes['eventables']);
    this.change.stations(changes['stations']);
    this.change.devices(changes['devices']);
    this.change.records(changes['records']);
  }
  ngOnInit(): void {
    this.regist.input();
    this.regist.output();
    this.load.division();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
