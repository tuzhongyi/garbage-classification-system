import { EventEmitter } from '@angular/core';
import { GridCell } from '../../../../../../common/network/model/garbage-station/grid-cell.model';
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
      tool
    );
    this.right = new GarbageManagementManagerCardStreetRightController(
      common,
      tool
    );
    this.regist(load);
  }

  left: GarbageManagementManagerCardStreetLeftController;
  right: GarbageManagementManagerCardStreetRightController;

  private gridcellId?: string;
  private regist(load: EventEmitter<void>) {
    load.subscribe(() => {
      this.left.load.emit({ gridcellId: this.gridcellId });
      this.right.load.emit({ gridcellId: this.gridcellId });
    });
    this.right.event.gridcell.subscribe((x) => {
      this.gridcellId = x?.Id;
      this.left.load.emit({ gridcellId: this.gridcellId });
      this.right.load.emit({ gridcellId: this.gridcellId });
    });
  }

  select(data?: GridCell) {
    this.right.select.emit(data);
  }
}
