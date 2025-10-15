import { KeyValue } from '@angular/common';
import { PlateColor } from '../../../../../../common/enum/vehicle/plate-color.enum';
import { VehicleType } from '../../../../../../common/enum/vehicle/vehicle-type.enum';
import { EnumTool } from '../../../../../../common/tools/enum-tool/enum.tool';
import { Language } from '../../../../../../common/tools/language';

export class GarbageManagementVehicleDetailsSource {
  colors: KeyValue<PlateColor, string>[];
  types: KeyValue<VehicleType, string>[];

  constructor() {
    this.colors = this.init.color();
    this.types = this.init.types();
  }

  private init = {
    color: () => {
      let values = EnumTool.values(PlateColor);
      return values.map((x) => {
        return { key: x, value: Language.PlateColor(x) };
      });
    },
    types: () => {
      let values = EnumTool.values(VehicleType);
      return values.map((x) => {
        return { key: x, value: Language.IllegalVehicleType(x) };
      });
    },
  };
}
