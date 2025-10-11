import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';

export class GarbageManagementRecordEventIllegalVehicleStatisticDetailsArgs {
  unit = TimeUnit.Day;
  date = new Date();
  divisionId?: string;
  stationId?: string;
}
