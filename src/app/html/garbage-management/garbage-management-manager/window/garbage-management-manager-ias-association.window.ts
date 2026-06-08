import { WindowViewModel } from '../../../../common/components/window/window.model';
import { Duration } from '../../../../common/network/model/garbage-station/duration.model';
import { IasEventRecord } from '../../../../common/network/model/ias/ias-event-record.model';
import { SizeTool } from '../../../../common/tools/size-tool/size.tool';
import { GarbageManagementRecordEventIasListTableArgs } from '../../garbage-management-container/garbage-management-record-event-ias/garbage-management-record-event-ias-list/garbage-management-record-event-ias-list-table/business/garbage-management-record-event-ias-list-table.model';

export class GarbageManagementManagerIasAssociationWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,

    zIndex: '2',
  };
  title = '高频关联事件';
  args = new GarbageManagementRecordEventIasListTableArgs();

  open(args: { duration: Duration; data: IasEventRecord }) {
    if (
      args.data.AssociationRecordIds &&
      args.data.AssociationRecordIds.length > 0
    ) {
      this.args.duration = args.duration;
      this.args.ids = args.data.AssociationRecordIds;
      this.show = true;
    }
  }
}
