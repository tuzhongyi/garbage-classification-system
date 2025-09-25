import { StationState } from '../../../../../../common/enum/station-state.enum';
import { MixedIntoEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { DivisionViewModel } from '../../../../../../common/view-model/division.view-model';

export class GarbageManagementRecordEventMixedIntoListTableArgs {
  duration = DateTimeTool.all.day(new Date());
  divisionId?: string;
  stationId?: string;
  stationname?: string;
  communityname?: string;
}
export class MixedIntoEventRecordViewModel extends MixedIntoEventRecord {
  images: string[] = [];
  states!: Promise<StationState[]>;
  GarbageStation!: Promise<GarbageStation>;
  Division?: Promise<DivisionViewModel>;
}
