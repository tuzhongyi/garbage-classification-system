import { EventEmitter } from '@angular/core';
import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';
import {
  GarbageManagementManagerIndex,
  IGarbageManagementManagerCardController,
  IGarbageManagementManagerCardElement,
} from '../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from './common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardEventTrigger } from './garbage-management-manager-card.trigger';
import { GarbageManagementManagerCardHomeController } from './home/garbage-management-manager-card-home.controller';
import { GarbageManagementManagerCardIllegalDumpController } from './illegaldump/garbage-management-manager-card-illegaldump.controller';
import { GarbageManagementManagerCardMixedIntoController } from './mixedinto/garbage-management-manager-card-mixedinto.controller';
import { GarbageManagementManagerCardStreetController } from './street/garbage-management-manager-card-street.controller';
import { GarbageManagementManagerCardVehicleController } from './vehicle/garbage-management-manager-card-vehicle.controller';

export class GarbageManagementManagerCardController {
  constructor(private that: GarbageManagementManagerComponent) {
    this.trigger = new GarbageManagementManagerCardEventTrigger(that);
    this.init.load();
  }

  private get tool() {
    return this.that.tool;
  }

  private trigger: GarbageManagementManagerCardEventTrigger;

  private index = GarbageManagementManagerIndex.home;

  private controller = new Map<
    GarbageManagementManagerIndex,
    IGarbageManagementManagerCardController
  >();

  left: Array<IGarbageManagementManagerCardElement> = [];
  right: Array<IGarbageManagementManagerCardElement> = [];

  private init = {
    load: async () => {
      let common = new GarbageManagementManagerCardCommonController();
      let home = this.init.home(common);
      this.init.station(common);
      this.init.illegaldump(common);
      this.init.vehicle(common);
      this.init.street(common);
      this.left = await home.left.html;
      this.right = await home.right.html;
    },
    home: (common: GarbageManagementManagerCardCommonController) => {
      let controller = new GarbageManagementManagerCardHomeController(
        common,
        this.tool,
        this.load.event
      );
      this.regist.home(controller);
      this.controller.set(GarbageManagementManagerIndex.home, controller);
      return controller;
    },
    station: (common: GarbageManagementManagerCardCommonController) => {
      let controller = new GarbageManagementManagerCardMixedIntoController(
        common,
        this.tool,
        this.load.event
      );
      this.regist.station(controller);
      this.controller.set(
        GarbageManagementManagerIndex.garbagestation,
        controller
      );
      return controller;
    },
    illegaldump: (common: GarbageManagementManagerCardCommonController) => {
      let controller = new GarbageManagementManagerCardIllegalDumpController(
        common,
        this.tool,
        this.load.event
      );
      this.regist.illegaldump(controller);
      this.controller.set(
        GarbageManagementManagerIndex.illegaldump,
        controller
      );
      return controller;
    },
    vehicle: (common: GarbageManagementManagerCardCommonController) => {
      let controller = new GarbageManagementManagerCardVehicleController(
        common,
        this.tool,
        this.load.event
      );
      this.regist.vehicle(controller);
      this.controller.set(GarbageManagementManagerIndex.vehicle, controller);
      return controller;
    },
    street: (common: GarbageManagementManagerCardCommonController) => {
      let controller = new GarbageManagementManagerCardStreetController(
        common,
        this.tool,
        this.load.event
      );
      this.regist.street(controller);
      this.controller.set(GarbageManagementManagerIndex.street, controller);
      return controller;
    },
  };

  private regist = {
    home: (controller: GarbageManagementManagerCardHomeController) => {
      controller.right.event.record.position.subscribe((data) => {
        this.trigger.record.position(data);
      });
      controller.right.event.record.details.subscribe((data) => {
        this.trigger.record.task(data);
      });
      controller.left.event.record.type.subscribe((x) => {
        this.trigger.record.type(x);
      });
      controller.left.event.statistic.click.subscribe((x) => {
        this.trigger.record.statistic(x);
      });
    },
    station: (controller: GarbageManagementManagerCardMixedIntoController) => {
      controller.left.event.statistic.click.subscribe((x) => {
        this.trigger.record.statistic(x);
      });
    },
    street: (controller: GarbageManagementManagerCardStreetController) => {
      controller.left.event.device.subscribe((online) => {
        this.trigger.ias.device(online);
      });
      controller.left.event.record.subscribe(() => {
        this.trigger.ias.statistic();
      });
      controller.right.event.task.subscribe((x) => {
        this.trigger.ias.task(x);
      });
      controller.right.event.position.subscribe((x) => {
        // this.event.position.emit(x);
        this.trigger.ias.position(x);
      });
      controller.right.event.gridcell.subscribe((x) => {
        this.trigger.ias.gridcell(x);
      });
    },
    vehicle: (controller: GarbageManagementManagerCardVehicleController) => {
      controller.right.event.task.subscribe((data) => {
        this.trigger.vehicle.task(data);
      });
      controller.left.event.statistic.click.subscribe((x) => {
        this.trigger.record.statistic(x);
      });
    },
    illegaldump: (
      controller: GarbageManagementManagerCardIllegalDumpController
    ) => {
      controller.right.event.record.position.subscribe((data) => {
        this.trigger.record.position(data);
      });
      controller.right.event.record.details.subscribe((data) => {
        this.trigger.record.task(data);
      });
      controller.left.event.statistic.click.subscribe((x) => {
        this.trigger.record.statistic(x);
      });
    },
  };

  on = {
    index: async (index: GarbageManagementManagerIndex) => {
      let street = this.controller.get(index);
      if (street instanceof GarbageManagementManagerCardStreetController) {
        street.select();
      }

      this.index = index;
      this.left = [];
      this.right = [];
      let controller = this.controller.get(index);
      if (controller) {
        this.left = await controller.left.html;
        this.right = await controller.right.html;
      }

      if (index != GarbageManagementManagerIndex.street) {
        this.that.global.division.default.then((def) => {
          this.that.map.select.emit(def);
        });
      } else {
        this.right;
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
