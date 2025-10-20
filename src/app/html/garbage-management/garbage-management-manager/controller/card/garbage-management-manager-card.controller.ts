import { EventEmitter, Injectable } from '@angular/core';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { IEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { ComponentTool } from '../../../../../common/tools/component-tool/component.tool';
import {
  GarbageManagementManagerIndex,
  IGarbageManagementManagerCardController,
  IGarbageManagementManagerCardElement,
} from '../../garbage-management-manager.model';
import { GarbageManagementManagerPanel } from '../../panel/garbage-management-manager.panel';
import { GarbageManagementManagerWindow } from '../../window/garbage-management-manager.window';
import { GarbageManagementManagerCardCommonController } from './common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardHomeController } from './home/garbage-management-manager-card-home.controller';
import { GarbageManagementManagerCardIllegalDumpController } from './illegaldump/garbage-management-manager-card-illegaldump.controller';
import { GarbageManagementManagerCardMixedIntoController } from './mixedinto/garbage-management-manager-card-mixedinto.controller';
import { GarbageManagementManagerCardStreetController } from './street/garbage-management-manager-card-street.controller';
import { GarbageManagementManagerCardVehicleController } from './vehicle/garbage-management-manager-card-vehicle.controller';

@Injectable()
export class GarbageManagementManagerCardController {
  event = {
    position: new EventEmitter<IEventRecord>(),
  };

  constructor(
    private tool: ComponentTool,
    private panel: GarbageManagementManagerPanel,
    private window: GarbageManagementManagerWindow
  ) {
    this.init();
  }

  private index = GarbageManagementManagerIndex.home;

  private controller = new Map<
    GarbageManagementManagerIndex,
    IGarbageManagementManagerCardController
  >();

  left: Array<IGarbageManagementManagerCardElement> = [];
  right: Array<IGarbageManagementManagerCardElement> = [];

  private async init() {
    let common = new GarbageManagementManagerCardCommonController();
    let home = new GarbageManagementManagerCardHomeController(
      common,
      this.tool,
      this.load.event
    );
    this.regist.home(home);
    this.controller.set(GarbageManagementManagerIndex.home, home);
    this.controller.set(
      GarbageManagementManagerIndex.garbagestation,
      new GarbageManagementManagerCardMixedIntoController(
        common,
        this.tool,
        this.load.event
      )
    );
    let illegaldump = new GarbageManagementManagerCardIllegalDumpController(
      common,
      this.tool,
      this.load.event
    );
    this.regist.illegaldump(illegaldump);
    this.controller.set(GarbageManagementManagerIndex.illegaldump, illegaldump);
    let vehicle = new GarbageManagementManagerCardVehicleController(
      common,
      this.tool,
      this.load.event
    );
    this.regist.vehicle(vehicle);
    this.controller.set(GarbageManagementManagerIndex.vehicle, vehicle);
    let street = new GarbageManagementManagerCardStreetController(
      common,
      this.tool,
      this.load.event
    );
    this.regist.street(street);
    this.controller.set(GarbageManagementManagerIndex.street, street);

    this.left = await home.left.html;
    this.right = await home.right.html;
  }

  private regist = {
    home: (controller: GarbageManagementManagerCardHomeController) => {
      controller.right.event.record.position.subscribe((data) => {
        this.event.position.emit(data);
      });
      controller.right.event.record.details.subscribe((data) => {
        this.window.task.complete.open(data);
      });
      controller.left.event.record.type.subscribe((x) => {
        switch (x) {
          case EventType.GarbageFull:
            this.panel.record.garbagefull.open();
            break;
          case EventType.IllegalDrop:
            this.panel.record.illegaldrop.open();
            break;
          case EventType.IllegalDrop2:
            this.panel.record.illegaldump.open();
            break;
          case EventType.MixedInto:
            this.panel.record.mixedinto.open();
            break;
          case EventType.GarbageDrop:
            this.panel.record.garbagedrop.open();
            break;
          case EventType.IllegalVehicle:
            this.panel.record.illegalvehicle.open();
            break;
          case 103:
            this.panel.record.ias.open();
            break;

          default:
            break;
        }
      });
      controller.left.event.statistic.click.subscribe((x) => {
        switch (x.type) {
          case EventType.IllegalDrop2:
            this.panel.record.illegaldump.open(x);
            break;
          case EventType.IllegalVehicle:
            this.panel.record.illegalvehicle.open(x);
            break;
          case EventType.MixedInto:
            this.panel.record.mixedinto.open(x);
            break;
          case EventType.GarbageFull:
            this.panel.record.garbagefull.open(x);
            break;
          case EventType.GarbageDrop:
            this.panel.record.garbagedrop.open(x);
            break;
          default:
            break;
        }
      });
    },
    street: (controller: GarbageManagementManagerCardStreetController) => {
      controller.left.event.device.subscribe((online) => {
        this.panel.street.clear();
        this.panel.street.online = online;
        this.panel.street.show = true;
      });
      controller.left.event.record.subscribe(() => {
        this.panel.record.ias.show = true;
      });
      controller.right.event.task.subscribe((x) => {
        this.window.task.ias.data = x;
        this.window.task.ias.show = true;
      });
    },
    vehicle: (controller: GarbageManagementManagerCardVehicleController) => {
      controller.right.event.task.subscribe((data) => {
        this.window.task.illegalvehicle.data = data;
        this.window.task.illegalvehicle.show = true;
      });
    },
    illegaldump: (
      controller: GarbageManagementManagerCardIllegalDumpController
    ) => {
      controller.right.event.record.position.subscribe((data) => {
        this.event.position.emit(data);
      });
      controller.right.event.record.details.subscribe((data) => {
        this.window.task.complete.open(data);
      });
    },
  };

  on = {
    index: async (index: GarbageManagementManagerIndex) => {
      this.index = index;
      this.left = [];
      this.right = [];
      let controller = this.controller.get(index);
      if (controller) {
        this.left = await controller.left.html;
        this.right = await controller.right.html;
      }
    },
  };

  load = {
    event: new EventEmitter<void>(),
    left: (containers: NodeListOf<Element>) => {
      let ctor = this.left;
      for (let i = 0; i < containers.length; i++) {
        let container = containers.item(i);
        this.append(container, ctor[i].element);
      }
    },
    right: (containers: NodeListOf<Element>) => {
      let ctor = this.right;
      for (let i = 0; i < containers.length; i++) {
        let container = containers.item(i);
        this.append(container, ctor[i].element);
      }
    },
  };

  private append(container: Element, element: HTMLElement) {
    container.appendChild(element);
    return element;
  }
}
