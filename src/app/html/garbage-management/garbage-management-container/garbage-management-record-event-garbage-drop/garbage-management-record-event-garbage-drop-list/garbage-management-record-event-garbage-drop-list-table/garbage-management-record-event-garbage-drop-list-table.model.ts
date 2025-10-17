import { CompareRange } from '../../../../../../common/network/model/garbage-station/compare-range.model';
import { GarbageDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { DivisionViewModel } from '../../../../../../common/view-model/division.view-model';

export class GarbageManagementRecordEventGarbageDropListTableArgs {
  duration = DateTimeTool.all.day(new Date());
  divisionId?: string;
  stationId?: string;
  stationname?: string;
  communityname?: string;
  stay?: CompareRange<number>;
  handle?: boolean;
  timeout?: boolean;
}
export class GarbageDropEventRecordViewModel extends GarbageDropEventRecord {
  images: string[] = [];

  GarbageStation!: Promise<GarbageStation>;
  Division?: Promise<DivisionViewModel>;
  SendTime?: string;
  DropDuration?: string;
  HandleTime?: string;
  status?: {
    value: string;
    class: string;
  };
}
