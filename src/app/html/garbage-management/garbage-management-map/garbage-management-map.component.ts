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
import { GarbageStation } from '../../../common/network/model/garbage-station/garbage-station.model';
import { IasDevice } from '../../../common/network/model/ias/ias-device.model';
import { IasEventRecord } from '../../../common/network/model/ias/ias-event-record.model';
import { GeoTool } from '../../../common/tools/geo-tool/geo.tool';
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
  @Input() select?: EventEmitter<
    GarbageStation | IasDevice | IDivision | IasEventRecord
  >;
  @Input() move?: EventEmitter<[number, number]>;
  @Input() refresh = false;

  @Output() refreshChange = new EventEmitter<boolean>();

  @Output() recorddblclick = new EventEmitter<IasEventRecord>();

  @Output() camera = new EventEmitter<GarbageStationViewModel>();
  @Output() mixedinto = new EventEmitter<GarbageStationViewModel>();
  @Output() illegaldrop = new EventEmitter<GarbageStationViewModel>();
  @Output() illegalvehicle = new EventEmitter<GarbageStationViewModel>();
  @Output() garbagefull = new EventEmitter<GarbageStationViewModel>();
  @Output() garbagedrop = new EventEmitter<GarbageStationViewModel>();
  @Output() error = new EventEmitter<GarbageStationViewModel>();

  constructor(
    public controller: GarbageManagementMapController,
    private business: GarbageManagementMapBusiness
  ) {}
  private subscription = new Subscription();
  private regist = {
    input: () => {
      if (this.select) {
        let sub = this.select.subscribe((data) => {
          if (data instanceof GarbageStation) {
            this.on.select.station(data);
          } else if (data instanceof IasDevice) {
            this.on.select.ias.device(data);
          } else if (data instanceof IasEventRecord) {
            this.on.select.ias.record(data);
          } else {
            this.on.select.division(data);
          }
        });
        this.subscription.add(sub);
      }
      if (this.move) {
        let sub = this.move.subscribe((x) => {
          this.controller.move(x);
        });
        this.subscription.add(sub);
      }
    },
    output: () => {
      this.controller.ias.record.event.dblclick.subscribe((data) => {
        this.recorddblclick.emit(data);
      });
      this.controller.station.event.camera.subscribe((data) => {
        this.camera.emit(data);
      });
      this.controller.station.event.mixedinto.subscribe((data) => {
        this.mixedinto.emit(data);
      });
      this.controller.station.event.illegaldrop.subscribe((data) => {
        this.illegaldrop.emit(data);
      });
      this.controller.station.event.illegalvehicle.subscribe((data) => {
        this.illegalvehicle.emit(data);
      });
      this.controller.station.event.garbagefull.subscribe((data) => {
        this.garbagefull.emit(data);
      });
      this.controller.station.event.garbagedrop.subscribe((data) => {
        this.garbagedrop.emit(data);
      });
      this.controller.station.event.error.subscribe((data) => {
        this.error.emit(data);
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
    refresh: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        if (this.refresh) {
          this.controller.station.blur();
          this.controller.ias.record.blur();
          this.refresh = false;
          setTimeout(() => {
            this.refreshChange.emit(this.refresh);
          }, 0);
        }
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
      this.controller.ias.device.load(datas);
    },
    record: (datas: IasEventRecord[]) => {
      this.controller.ias.record.load(datas);
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.eventables(changes['eventables']);
    this.change.stations(changes['stations']);
    this.change.devices(changes['devices']);
    this.change.records(changes['records']);
    this.change.refresh(changes['refresh']);
  }
  ngOnInit(): void {
    this.regist.input();
    this.regist.output();
    this.load.division();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private on = {
    select: {
      ias: {
        device: (data: IasDevice) => {
          if (data.Location) {
            this.controller.move([
              data.Location.Longitude,
              data.Location.Latitude,
            ]);
          }
        },
        record: (data: IasEventRecord) => {
          this.controller.ias.record.select(data);
          if (data.Location) {
            let position = GeoTool.point.convert.wgs84.to.gcj02(
              data.Location.Longitude,
              data.Location.Latitude
            );
            this.controller.move(position);
          }
        },
      },
      station: (data: GarbageStation) => {
        this.controller.station.blur();
        this.controller.station.select(data.Id);
        if (data.GisPoint) {
          this.controller.move([
            data.GisPoint.Longitude,
            data.GisPoint.Latitude,
          ]);
        }
      },
      division: (data: IDivision) => {
        this.controller.division.select(data.Id);

        this.business.map.default.get().then((x) => {
          if (x.Id === data.Id) {
            this.controller.fit();
          } else {
            this.business.map.get(data.Id).then((x) => {
              if (x) {
                this.controller.move([x.center.lon, x.center.lat]);
              }
            });
          }
        });
      },
    },
  };
}
