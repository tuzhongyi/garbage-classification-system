import { IPagedTableArgs } from '../../../../../../../common/tools/component-tool/table-abstract.component';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';

export class GarbageManagementRecordEventIasListTableArgs
  implements IPagedTableArgs
{
  duration = DateTimeTool.all.day(new Date());
  first?: boolean;
  address?: string;
  divisionId?: string;
}
