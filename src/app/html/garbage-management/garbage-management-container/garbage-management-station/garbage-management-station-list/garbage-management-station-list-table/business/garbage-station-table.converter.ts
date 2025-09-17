import { Injectable } from '@angular/core';
import { Division } from '../../../../../../../common/network/model/garbage-station/division.model';
import { GarbageStation } from '../../../../../../../common/network/model/garbage-station/garbage-station.model';
import { DivisionRequestService } from '../../../../../../../common/network/request/garbage/division/division-request.service';
import { EnumTool } from '../../../../../../../common/tools/enum-tool/enum.tool';
import { Flags } from '../../../../../../../common/tools/flags';
import { MediumTool } from '../../../../../../../common/tools/medium-tool/medium.tool';
import { DivisionViewModel } from '../../../../../../../common/view-model/division.view-model';
import { GarbageStationTableModel } from './garbage-station-table.model';

@Injectable()
export class GarbageStationTableConverter {
  constructor(division: DivisionRequestService) {
    this.service = { division };
  }
  private service: {
    division: DivisionRequestService;
  };

  convert(data: GarbageStation) {
    let model = new GarbageStationTableModel();
    model.GarbageStation = data;
    this.item.division(data, model);
    this.item.states(data, model);
    this.item.urls(data, model);
    return model;
  }

  division = {
    get: async (id: string) => {
      let data = await this.service.division.cache.get(id);
      return this.division.convert(data);
    },
    convert: (data: Division) => {
      let vm = new DivisionViewModel();
      vm = Object.assign(vm, data);
      if (data.ParentId) {
        vm.Parent = this.division.get(data.ParentId);
      }
      return vm;
    },
  };

  private item = {
    division: (data: GarbageStation, model: GarbageStationTableModel) => {
      if (data.DivisionId) {
        model.Division = this.division.get(data.DivisionId);
      }
    },
    states: (data: GarbageStation, model: GarbageStationTableModel) => {
      let flags = new Flags(data.StationState);
      model.states = flags.getValues();
      if (!model.states || model.states.length == 0) {
        model.states = [0];
      }
    },
    urls: (data: GarbageStation, model: GarbageStationTableModel) => {
      model.urls = new Promise((resolve) => {
        if (data.Cameras) {
          let all = data.Cameras.filter(
            (x) => !EnumTool.CameraIgnore(x.Classification)
          ).map((x) => MediumTool.img(x.ImageUrl));
          resolve(Promise.all(all));
        }
      });
    },
  };
}
