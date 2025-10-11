import { IllegalVehicleEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { DivisionViewModel } from '../../../../../../common/view-model/division.view-model';

export class GarbageManagementRecordEventIllegalVehicleListTableArgs {
  duration = DateTimeTool.all.day(new Date());
  divisionId?: string;
  stationId?: string;
  stationname?: string;
  communityname?: string;
}
export class IllegalVehicleEventRecordViewModel extends IllegalVehicleEventRecord {
  images: string[] = [];

  GarbageStation!: Promise<GarbageStation>;
  Division?: Promise<DivisionViewModel>;
}
