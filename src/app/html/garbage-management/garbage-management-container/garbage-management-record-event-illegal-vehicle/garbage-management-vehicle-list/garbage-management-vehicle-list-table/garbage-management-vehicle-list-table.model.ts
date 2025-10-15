import { IArgs } from '../../../../../../common/network/model/model.interface';

export class GarbageManagementVehicleListTableArgs implements IArgs {
  plate?: string;
  color?: number;
  type?: number;
  divisionId?: string;
  first = true;
}
