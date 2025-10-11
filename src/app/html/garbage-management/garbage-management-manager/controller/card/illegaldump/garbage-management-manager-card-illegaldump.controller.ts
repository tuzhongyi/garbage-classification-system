import { EventEmitter } from '@angular/core';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { IGarbageManagementManagerCardController } from '../../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from '../common/garbage-management-manager-card-common.controller';
import { GarbageManagementManagerCardIllegalDumpLeftController } from './garbage-management-manager-card-illegaldump-left.controller';
import { GarbageManagementManagerCardIllegalDumpRightController } from './garbage-management-manager-card-illegaldump-right.controller';

export class GarbageManagementManagerCardIllegalDumpController
  implements IGarbageManagementManagerCardController
{
  constructor(
    common: GarbageManagementManagerCardCommonController,
    tool: ComponentTool,
    load: EventEmitter<void>
  ) {
    this.left = new GarbageManagementManagerCardIllegalDumpLeftController(
      common,
      tool,
      load
    );
    this.right = new GarbageManagementManagerCardIllegalDumpRightController(
      common,
      tool,
      load
    );
  }

  left: GarbageManagementManagerCardIllegalDumpLeftController;
  right: GarbageManagementManagerCardIllegalDumpRightController;
}
