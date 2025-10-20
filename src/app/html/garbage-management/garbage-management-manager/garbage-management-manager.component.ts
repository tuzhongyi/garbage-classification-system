import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ContainerPageComponent } from '../../../common/components/container/container-page/container-page.component';
import { PicturePolygonMultipleComponent } from '../../../common/components/picture/picture-polygon-multiple/picture-polygon-multiple.component';
import { GarbageDropEventRecord } from '../../../common/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { GarbageStation } from '../../../common/network/model/garbage-station/garbage-station.model';
import { GlobalStorageService } from '../../../common/storage/global.storage';
import { wait } from '../../../common/tools/wait.tools';
import { HowellPanelComponent } from '../../share/panel/panel.component';
import { VideoMultipleComponent } from '../../share/video/video-multiple/video-multiple.component';
import { VideoWindowComponent } from '../../share/video/video-window/video-window.component';
import { HowellWindowComponent } from '../../share/window/window.component';
import { GarbageManagementRecordEventGarbageDropManagerComponent } from '../garbage-management-container/garbage-management-record-event-garbage-drop/garbage-management-record-event-garbage-drop-manager/garbage-management-record-event-garbage-drop-manager.component';
import { GarbageManagementRecordEventGarbageFullManagerComponent } from '../garbage-management-container/garbage-management-record-event-garbage-full/garbage-management-record-event-garbage-full-manager/garbage-management-record-event-garbage-full-manager.component';
import { EventHandleCompleteComponent } from '../garbage-management-container/garbage-management-record-event-handle-complete/event-handle-complete/event-handle-complete.component';
import { GarbageManagementRecordEventIasManagerComponent } from '../garbage-management-container/garbage-management-record-event-ias/garbage-management-record-event-ias-manager/garbage-management-record-event-ias-manager.component';
import { GarbageManagementRecordEventIasTaskManagerComponent } from '../garbage-management-container/garbage-management-record-event-ias/garbage-management-record-event-ias-task/garbage-management-record-event-ias-task-manager/garbage-management-record-event-ias-task-manager.component';
import { GarbageManagementRecordEventIllegalDropManagerComponent } from '../garbage-management-container/garbage-management-record-event-illegal-drop/garbage-management-record-event-illegal-drop-manager/garbage-management-record-event-illegal-drop-manager.component';
import { GarbageManagementRecordEventIllegalDumpManagerComponent } from '../garbage-management-container/garbage-management-record-event-illegal-dump/garbage-management-record-event-illegal-dump-manager/garbage-management-record-event-illegal-dump-manager.component';
import { GarbageManagementRecordEventIllegalVehicleManagerComponent } from '../garbage-management-container/garbage-management-record-event-illegal-vehicle/garbage-management-record-event-illegal-vehicle-manager/garbage-management-record-event-illegal-vehicle-manager.component';
import { GarbageManagementRecordEventIllegalVehicleTaskManagerComponent } from '../garbage-management-container/garbage-management-record-event-illegal-vehicle/garbage-management-record-event-illegal-vehicle-task/garbage-management-record-event-illegal-vehicle-task-manager/garbage-management-record-event-illegal-vehicle-task-manager.component';
import { GarbageManagementRecordEventMixedIntoManagerComponent } from '../garbage-management-container/garbage-management-record-event-mixed-into/garbage-management-record-event-mixed-into-manager/garbage-management-record-event-mixed-into-manager.component';
import { GarbageManagementStationManagerComponent } from '../garbage-management-container/garbage-management-station/garbage-management-station-manager/garbage-management-station-manager.component';
import { GarbageManagementControlButtonListComponent } from '../garbage-management-control/garbage-management-control-button-list/garbage-management-control-button-list.component';
import { GarbageManagementHeaderComponent } from '../garbage-management-header/component/garbage-management-header.component';
import { GarbageManagementManagerSettingsComponent } from '../garbage-management-manager-settings/garbage-management-manager-settings.component';
import { GarbageManagementMapComponent } from '../garbage-management-map/garbage-management-map.component';
import { GarbageManagementStateRecordIasComponent } from '../garbage-management-state/garbage-management-state-record-ias/garbage-management-state-record-ias.component';
import { GarbageManagementStateStationComponent } from '../garbage-management-state/garbage-management-state-station/garbage-management-state-station.component';
import { GarbageManagementStatisticStationComponent } from '../garbage-management-statistic/garbage-management-statistic-station/component/garbage-management-statistic-station.component';
import { GarbageManagementStreetDeviceManagerComponent } from '../garbage-management-street/garbage-management-street-device/garbage-management-street-device-manager/garbage-management-street-device-manager.component';
import { GarbageManagementManagerBusiness } from './business/garbage-management-manager.business';
import { GarbageManagementManagerController } from './controller/garbage-management-manager.controller';
import { GarbageManagementManagerIndex } from './garbage-management-manager.model';
import { GarbageManagementManagerProviders } from './garbage-management-manager.provider';
import { GarbageManagementManagerPanel } from './panel/garbage-management-manager.panel';
import { GarbageManagementManagerWindow } from './window/garbage-management-manager.window';

// GarbageManagementMapComponent,
@Component({
  selector: 'howell-garbage-management-manager',
  templateUrl: './garbage-management-manager.component.html',
  styleUrl: './garbage-management-manager.component.less',
  imports: [
    CommonModule,
    GarbageManagementHeaderComponent,
    GarbageManagementMapComponent,
    GarbageManagementStatisticStationComponent,
    HowellWindowComponent,
    HowellPanelComponent,
    VideoWindowComponent,
    VideoMultipleComponent,
    ContainerPageComponent,
    PicturePolygonMultipleComponent,
    GarbageManagementManagerSettingsComponent,
    GarbageManagementControlButtonListComponent,
    GarbageManagementStateStationComponent,
    GarbageManagementStateRecordIasComponent,
    GarbageManagementStationManagerComponent,
    GarbageManagementStreetDeviceManagerComponent,
    GarbageManagementRecordEventIasManagerComponent,

    GarbageManagementRecordEventGarbageFullManagerComponent,
    GarbageManagementRecordEventIllegalDropManagerComponent,
    GarbageManagementRecordEventIllegalDumpManagerComponent,
    GarbageManagementRecordEventGarbageDropManagerComponent,
    GarbageManagementRecordEventMixedIntoManagerComponent,
    GarbageManagementRecordEventIllegalVehicleManagerComponent,
    GarbageManagementStationManagerComponent,
    EventHandleCompleteComponent,

    GarbageManagementRecordEventIasTaskManagerComponent,
    GarbageManagementRecordEventIllegalVehicleTaskManagerComponent,
  ],
  providers: [...GarbageManagementManagerProviders],
})
export class GarbageManagementManagerComponent implements OnInit, OnDestroy {
  get card() {
    return this.controller.card;
  }
  get navigation() {
    return this.controller.navigation;
  }
  get data() {
    return this.controller.data;
  }
  get statistic() {
    return this.controller.statistic;
  }
  get video() {
    return this.controller.video;
  }
  get map() {
    return this.controller.map;
  }

  constructor(
    public panel: GarbageManagementManagerPanel,
    public window: GarbageManagementManagerWindow,
    private controller: GarbageManagementManagerController,
    private business: GarbageManagementManagerBusiness,
    private global: GlobalStorageService
  ) {}
  Index = GarbageManagementManagerIndex;
  private destroyed = false;
  private element = {
    left: undefined as ElementRef<HTMLElement> | undefined,
    right: undefined as ElementRef<HTMLElement> | undefined,
  };
  private get left() {
    return this.element.left;
  }
  @ViewChild('container_left')
  private set left(value: ElementRef<HTMLElement> | undefined) {
    this.element.left = value;
    if (value) {
      this.load.left(value.nativeElement);
    }
  }
  private get right() {
    return this.element.right;
  }
  @ViewChild('container_right')
  private set right(value: ElementRef<HTMLElement> | undefined) {
    this.element.right = value;
    if (value) {
      this.load.right(value.nativeElement);
    }
  }
  private regist = {
    load: () => {
      this.regist.global();
      this.regist.navigation();
      this.regist.card();
      this.regist.panel();
    },
    global: () => {
      this.global.division.change.subscribe((x) => {
        this.card.load.event.emit();
        this.map.select.emit(x);
      });
    },
    navigation: () => {
      this.controller.navigation.change.subscribe((x) => {
        this.map.refresh = true;

        this.card.on.index(x);
        if (this.left) {
          this.load.left(this.left.nativeElement);
        }
        if (this.right) {
          this.load.right(this.right.nativeElement);
        }
        this.data.on.index(x);
      });
    },
    card: () => {
      this.controller.card.event.position.subscribe((x) => {
        if (x instanceof GarbageDropEventRecord) {
          // if (x.Data.GisPoint) {
          //   let position: [number, number] = [
          //     x.Data.GisPoint.Longitude,
          //     x.Data.GisPoint.Latitude,
          //   ];
          //   this.map.move.emit(position);
          // }

          let station = new GarbageStation();
          station.Id = x.Data.StationId;
          station.GisPoint = x.Data.GisPoint;
          this.map.select.emit(station);
        }
      });

      wait(
        () => {
          this.card.load.event.emit();
          return this.destroyed;
        },

        60 * 1000
      );
    },
    panel: () => {
      this.panel.station.event.move.subscribe((x) => {
        this.map.move.emit(x);
      });
      this.panel.station.event.select.subscribe((x) => {
        this.map.select.emit(x);
      });
      this.panel.street.event.move.subscribe((x) => {
        this.map.move.emit(x);
      });
      this.panel.street.event.select.subscribe((x) => {
        this.map.select.emit(x);
      });
    },
  };

  ngOnInit(): void {
    this.regist.load();
    this.controller.navigation.home();
    this.data.load();
  }
  ngOnDestroy(): void {
    this.destroyed = true;
  }

  load = {
    left: (element: HTMLElement) => {
      let items = element.querySelectorAll(
        '.garbage-management-manager-card-item'
      );
      wait(() => {
        items = element.querySelectorAll(
          '.garbage-management-manager-card-item'
        );
        return items.length > 0;
      }).then(() => {
        this.controller.card.load.left(items);
      });
    },
    right: (element: HTMLElement) => {
      let items = element.querySelectorAll(
        '.garbage-management-manager-card-item'
      );
      wait(() => {
        items = element.querySelectorAll(
          '.garbage-management-manager-card-item'
        );
        return items.length > 0;
      }).then(() => {
        this.controller.card.load.right(items);
      });
    },
  };
}
