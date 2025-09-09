import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardIllegalDropLeftController } from './garbage-management-manager-card-illegaldrop-left.controller';
import { GarbageManagementManagerCardIllegalDropRightController } from './garbage-management-manager-card-illegaldrop-right.controller';

export class GarbageManagementManagerCardIllegalDropController
  implements IGarbageManagementManagerCardController
{
  constructor(tool: ComponentTool) {
    this.left = new GarbageManagementManagerCardIllegalDropLeftController(tool);
    this.right = new GarbageManagementManagerCardIllegalDropRightController(
      tool
    );
  }

  left: GarbageManagementManagerCardIllegalDropLeftController;
  right: GarbageManagementManagerCardIllegalDropRightController;
}
