import { Injectable } from '@angular/core';
import { StationState } from '../../../../../../common/enum/station-state.enum';
import { StationType } from '../../../../../../common/enum/station-type.enum';
import { IIdNameModel } from '../../../../../../common/network/model/model.interface';
import { EnumTool } from '../../../../../../common/tools/enum-tool/enum.tool';
import { Language } from '../../../../../../common/tools/language';

@Injectable()
export class GarbageManagementStationListManagerSource {
  types: IIdNameModel<number>[];
  states: IIdNameModel<number>[];

  constructor() {
    this.types = this.init.type();
    this.states = this.init.state();
  }

  init = {
    type: () => {
      return EnumTool.values(StationType).map((value) => {
        let model: IIdNameModel<number> = {
          Id: value,
          Name: Language.StationType(value),
        };
        return model;
      });
    },
    state: () => {
      return [
        { Id: StationState.Normal, Name: '正常' },
        { Id: StationState.Full, Name: '满溢' },
        { Id: StationState.Error, Name: '异常' },
      ];
    },
  };
}
