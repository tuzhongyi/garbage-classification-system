import { EventEmitter } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardStreetLeftController } from './garbage-management-manager-card-street-left.controller';
import { GarbageManagementManagerCardStreetRightController } from './garbage-management-manager-card-street-right.controller';

export class GarbageManagementManagerCardStreetController
  implements IGarbageManagementManagerCardController
{
  constructor(
    common: GarbageManagementManagerCardCommonController,
    tool: ComponentTool,
    load: EventEmitter<void>
  ) {
    this.left = new GarbageManagementManagerCardStreetLeftController(
      common,
      tool,
      load
    );
    this.right = new GarbageManagementManagerCardStreetRightController(
      common,
      tool,
      load
    );
  }

  left: GarbageManagementManagerCardStreetLeftController;
  right: GarbageManagementManagerCardStreetRightController;
}
