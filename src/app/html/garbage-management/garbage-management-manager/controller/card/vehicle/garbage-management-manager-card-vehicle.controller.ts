import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardVehicleLeftController } from './garbage-management-manager-card-vehicle-left.controller';
import { GarbageManagementManagerCardVehicleRightController } from './garbage-management-manager-card-vehicle-right.controller';

export class GarbageManagementManagerCardVehicleController
  implements IGarbageManagementManagerCardController
{
  constructor(tool: ComponentTool) {
    this.left = new GarbageManagementManagerCardVehicleLeftController(tool);
    this.right = new GarbageManagementManagerCardVehicleRightController(tool);
  }

  left: GarbageManagementManagerCardVehicleLeftController;
  right: GarbageManagementManagerCardVehicleRightController;
}
