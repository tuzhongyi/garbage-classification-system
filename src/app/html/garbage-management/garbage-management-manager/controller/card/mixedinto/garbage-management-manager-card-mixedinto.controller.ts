import { EventEmitter } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardMixedIntoLeftController } from './garbage-management-manager-card-mixedinto-left.controller';
import { GarbageManagementManagerCardMixedIntoRightController } from './garbage-management-manager-card-mixedinto-right.controller';

export class GarbageManagementManagerCardMixedIntoController
  implements IGarbageManagementManagerCardController
{
  constructor(
    common: GarbageManagementManagerCardCommonController,
    tool: ComponentTool,
    load: EventEmitter<void>
  ) {
    this.left = new GarbageManagementManagerCardMixedIntoLeftController(
      common,
      tool,
      load
    );
    this.right = new GarbageManagementManagerCardMixedIntoRightController(
      common,
      tool,
      load
    );
  }

  left: GarbageManagementManagerCardMixedIntoLeftController;
  right: GarbageManagementManagerCardMixedIntoRightController;
}
