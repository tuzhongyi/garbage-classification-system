import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';

export class GarbageManagementChartPieRecordStatisticContainerArgs {
  unit = TimeUnit.Day;
  duration = DateTimeTool.allDay(new Date());
}
