import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardMixedIntoLeftController } from './garbage-management-manager-card-mixedinto-left.controller';
import { GarbageManagementManagerCardMixedIntoRightController } from './garbage-management-manager-card-mixedinto-right.controller';

export class GarbageManagementManagerCardMixedIntoController
  implements IGarbageManagementManagerCardController
{
  constructor(tool: ComponentTool) {
    this.left = new GarbageManagementManagerCardMixedIntoLeftController(tool);
    this.right = new GarbageManagementManagerCardMixedIntoRightController(tool);
  }

  left: GarbageManagementManagerCardMixedIntoLeftController;
  right: GarbageManagementManagerCardMixedIntoRightController;
}
