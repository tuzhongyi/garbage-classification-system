import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';

export class GarbageManagementRecordEventIasStatisticDetailsArgs {
  date = new Date();
  unit = TimeUnit.Day;
  deviceId?: string;
  gridcellId?: string;
}
