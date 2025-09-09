import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardHomeLeftController } from './garbage-management-manager-card-home-left.controller';
import { GarbageManagementManagerCardHomeRightController } from './garbage-management-manager-card-home-right.controller';

export class GarbageManagementManagerCardHomeController
  implements IGarbageManagementManagerCardController
{
  constructor(tool: ComponentTool) {
    this.left = new GarbageManagementManagerCardHomeLeftController(tool);
    this.right = new GarbageManagementManagerCardHomeRightController(tool);
  }

  left: GarbageManagementManagerCardHomeLeftController;
  right: GarbageManagementManagerCardHomeRightController;
}
