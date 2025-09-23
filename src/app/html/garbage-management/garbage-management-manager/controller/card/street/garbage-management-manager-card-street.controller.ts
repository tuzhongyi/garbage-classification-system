import { EventEmitter } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerPanel } from '../../../panel/garbage-management-manager.panel';
import { GarbageManagementManagerWindow } from '../../../window/garbage-management-manager.window';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardStreetLeftController } from './garbage-management-manager-card-street-left.controller';
import { GarbageManagementManagerCardStreetRightController } from './garbage-management-manager-card-street-right.controller';

export class GarbageManagementManagerCardStreetController
  implements IGarbageManagementManagerCardController
{
  constructor(
    common: GarbageManagementManagerCardCommonController,
    tool: ComponentTool,
    load: EventEmitter<void>,
    panel: GarbageManagementManagerPanel,
    window: GarbageManagementManagerWindow
  ) {
    this.left = new GarbageManagementManagerCardStreetLeftController(
      common,
      tool,
      load,
      panel
    );
    this.right = new GarbageManagementManagerCardStreetRightController(
      common,
      tool,
      load,
      window
    );
  }

  left: GarbageManagementManagerCardStreetLeftController;
  right: GarbageManagementManagerCardStreetRightController;
}
