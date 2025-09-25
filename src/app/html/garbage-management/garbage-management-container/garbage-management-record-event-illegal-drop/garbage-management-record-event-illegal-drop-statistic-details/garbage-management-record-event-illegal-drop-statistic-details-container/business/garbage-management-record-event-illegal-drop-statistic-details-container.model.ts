import { TimeUnit } from '../../../../../../../common/enum/time-unit.enum';

export class GarbageManagementRecordEventIllegalDropStatisticDetailsArgs {
  unit = TimeUnit.Day;
  date = new Date();
  divisionId?: string;
  stationId?: string;
}
