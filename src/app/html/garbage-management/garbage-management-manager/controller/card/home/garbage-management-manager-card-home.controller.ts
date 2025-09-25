import { EventEmitter } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerPanel } from '../../../panel/garbage-management-manager.panel';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardHomeLeftController } from './garbage-management-manager-card-home-left.controller';
import { GarbageManagementManagerCardHomeRightController } from './garbage-management-manager-card-home-right.controller';

export class GarbageManagementManagerCardHomeController
  implements IGarbageManagementManagerCardController
{
  constructor(
    common: GarbageManagementManagerCardCommonController,
    tool: ComponentTool,
    load: EventEmitter<void>,
    panel: GarbageManagementManagerPanel
  ) {
    this.left = new GarbageManagementManagerCardHomeLeftController(
      common,
      tool,
      load,
      panel
    );
    this.right = new GarbageManagementManagerCardHomeRightController(
      common,
      tool,
      load
    );
  }

  left: GarbageManagementManagerCardHomeLeftController;
  right: GarbageManagementManagerCardHomeRightController;
}
