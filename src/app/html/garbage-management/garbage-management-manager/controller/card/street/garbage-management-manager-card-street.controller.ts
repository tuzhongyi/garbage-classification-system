import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardStreetLeftController } from './garbage-management-manager-card-street-left.controller';
import { GarbageManagementManagerCardStreetRightController } from './garbage-management-manager-card-street-right.controller';

export class GarbageManagementManagerCardStreetController
  implements IGarbageManagementManagerCardController
{
  constructor(tool: ComponentTool) {
    this.left = new GarbageManagementManagerCardStreetLeftController(tool);
    this.right = new GarbageManagementManagerCardStreetRightController(tool);
  }

  left: GarbageManagementManagerCardStreetLeftController;
  right: GarbageManagementManagerCardStreetRightController;
}
