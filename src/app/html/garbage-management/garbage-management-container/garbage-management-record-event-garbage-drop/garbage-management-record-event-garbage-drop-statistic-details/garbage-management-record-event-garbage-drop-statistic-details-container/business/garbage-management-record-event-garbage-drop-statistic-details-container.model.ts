import { TimeUnit } from '../../../../../../../common/enum/time-unit.enum';

export class GarbageManagementRecordEventGarbageDropStatisticDetailsArgs {
  unit = TimeUnit.Day;
  date = new Date();
  divisionId?: string;
  stationId?: string;
}
