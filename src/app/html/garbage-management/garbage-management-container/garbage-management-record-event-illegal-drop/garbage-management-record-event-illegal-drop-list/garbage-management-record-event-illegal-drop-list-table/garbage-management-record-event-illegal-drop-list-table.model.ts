import { StationState } from '../../../../../../common/enum/station-state.enum';
import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { DivisionViewModel } from '../../../../../../common/view-model/division.view-model';

export class GarbageManagementRecordEventIllegalDropListTableArgs {
  duration = DateTimeTool.all.day(new Date());
  divisionId?: string;
  stationId?: string;
  stationname?: string;
  communityname?: string;
}
export class IllegalDropEventRecordViewModel extends IllegalDropEventRecord {
  images: string[] = [];
  states: StationState[] = [];
  GarbageStation!: GarbageStation;
  Division?: DivisionViewModel;
}
