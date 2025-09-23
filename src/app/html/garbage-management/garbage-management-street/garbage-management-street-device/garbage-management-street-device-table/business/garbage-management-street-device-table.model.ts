import { IPagedTableArgs } from '../../../../../../common/tools/component-tool/table-abstract.component';

export class GarbageManagementStreetDeviceTableArgs implements IPagedTableArgs {
  name?: string;
  online?: boolean;
  divisionId?: string;
  first?: boolean;
}
