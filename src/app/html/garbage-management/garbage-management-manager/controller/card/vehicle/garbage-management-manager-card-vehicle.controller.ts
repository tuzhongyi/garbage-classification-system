import { EventEmitter } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardVehicleLeftController } from './garbage-management-manager-card-vehicle-left.controller';
import { GarbageManagementManagerCardVehicleRightController } from './garbage-management-manager-card-vehicle-right.controller';

export class GarbageManagementManagerCardVehicleController
  implements IGarbageManagementManagerCardController
{
  constructor(
    common: GarbageManagementManagerCardCommonController,
    tool: ComponentTool,
    load: EventEmitter<void>
  ) {
    this.left = new GarbageManagementManagerCardVehicleLeftController(
      common,
      tool,
      load
    );
    this.right = new GarbageManagementManagerCardVehicleRightController(
      common,
      tool,
      load
    );
  }

  left: GarbageManagementManagerCardVehicleLeftController;
  right: GarbageManagementManagerCardVehicleRightController;
}
