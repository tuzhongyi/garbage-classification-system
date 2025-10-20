import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';

export class GarbageManagementRecordEventMixedIntoListTableArgs {
  duration = DateTimeTool.all.day(new Date());
  divisionId?: string;
  stationId?: string;
  stationname?: string;
  communityname?: string;
  handle?: boolean;
}
