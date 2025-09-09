import { Injectable } from '@angular/core';
import { ComponentTool } from '../../../../../common/tools/component-tool/component.tool';
import {
  GarbageManagementManagerIndex,
  IGarbageManagementManagerCardController,
  IGarbageManagementManagerCardElement,
} from '../../garbage-management-manager.model';
import { GarbageManagementManagerCardHomeController } from './home/garbage-management-manager-card-home.controller';
import { GarbageManagementManagerCardIllegalDropController } from './illegaldrop/garbage-management-manager-card-illegaldrop.controller';
import { GarbageManagementManagerCardMixedIntoController } from './mixedinto/garbage-management-manager-card-mixedinto.controller';
import { GarbageManagementManagerCardStreetController } from './street/garbage-management-manager-card-street.controller';
import { GarbageManagementManagerCardVehicleController } from './vehicle/garbage-management-manager-card-vehicle.controller';

@Injectable()
export class GarbageManagementManagerCardController {
  constructor(private tool: ComponentTool) {
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
    let home = new GarbageManagementManagerCardHomeController(this.tool);
    this.controller.set(GarbageManagementManagerIndex.home, home);
    this.controller.set(
      GarbageManagementManagerIndex.mixedinto,
      new GarbageManagementManagerCardMixedIntoController(this.tool)
    );
    this.controller.set(
      GarbageManagementManagerIndex.garbagedrop,
      new GarbageManagementManagerCardIllegalDropController(this.tool)
    );
    this.controller.set(
      GarbageManagementManagerIndex.vehicle,
      new GarbageManagementManagerCardVehicleController(this.tool)
    );
    this.controller.set(
      GarbageManagementManagerIndex.street,
      new GarbageManagementManagerCardStreetController(this.tool)
    );

    this.left = await home.left.html;
    this.right = await home.right.html;
  }

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
    left: async (containers: NodeListOf<Element>) => {
      let ctor = await this.left;
      for (let i = 0; i < containers.length; i++) {
        let container = containers.item(i);
        this.append(container, ctor[i].element);
      }
    },
    right: async (containers: NodeListOf<Element>) => {
      let ctor = await this.right;
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
