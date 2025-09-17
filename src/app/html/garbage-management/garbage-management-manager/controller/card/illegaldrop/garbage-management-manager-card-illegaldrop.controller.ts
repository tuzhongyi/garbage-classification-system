import { EventEmitter } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardIllegalDropLeftController } from './garbage-management-manager-card-illegaldrop-left.controller';
import { GarbageManagementManagerCardIllegalDropRightController } from './garbage-management-manager-card-illegaldrop-right.controller';

export class GarbageManagementManagerCardIllegalDropController
  implements IGarbageManagementManagerCardController
{
  constructor(
    common: GarbageManagementManagerCardCommonController,
    tool: ComponentTool,
    load: EventEmitter<void>
  ) {
    this.left = new GarbageManagementManagerCardIllegalDropLeftController(
      common,
      tool,
      load
    );
    this.right = new GarbageManagementManagerCardIllegalDropRightController(
      common,
      tool,
      load
    );
  }

  left: GarbageManagementManagerCardIllegalDropLeftController;
  right: GarbageManagementManagerCardIllegalDropRightController;
}
