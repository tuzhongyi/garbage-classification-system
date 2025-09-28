import { StationState } from '../../../../../../../common/enum/station-state.enum';
import { StationType } from '../../../../../../../common/enum/station-type.enum';
import { Flags } from '../../../../../../../common/tools/flags';
import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { GarbageStationViewModel } from '../../../../../../../common/view-model/garbage-station.view-model';
import { IMapIcon } from '../../../../garbage-management-map.model';

export class GarbageManagementMapAMapStationMarkerIconController
  implements IMapIcon<AMap.LabelMarkerIconOptions>
{
  constructor(private data: GarbageStationViewModel) {
    this.normal = this.init.normal();
    let flags = new Flags(this.data.StationState);
    if (!this.is.error(flags)) {
      this.hover = this.init.hover();
      this.selected = this.init.selected();
    }
  }
  normal: AMap.LabelMarkerIconOptions;
  hover?: AMap.LabelMarkerIconOptions;
  selected?: AMap.LabelMarkerIconOptions;

  private get opts(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      size: SizeTool.map.marker.station,
      image: '',
      anchor: 'bottom-center',
    };
    return icon;
  }

  private get path() {
    let flags = new Flags(this.data.StationState);
    switch (this.data.StationType) {
      case StationType.GarbageDrop:
        if (this.is.stay(this.data, flags)) {
          return PathTool.map.marker.illegaldrop.stay;
        } else {
          return PathTool.map.marker.illegaldrop;
        }
      case StationType.Construction:
        if (this.is.full(flags)) {
          return PathTool.map.marker.construction.full;
        }
        return PathTool.map.marker.construction;
      case StationType.VehicleWatching:
        return PathTool.map.marker.illegalvehicle;
      case StationType.Plus:
      case StationType.Smart:
        if (this.is.stay(this.data, flags)) {
          return PathTool.map.marker.station.wifi.stay;
        } else if (this.is.full(flags)) {
          return PathTool.map.marker.station.wifi.full;
        } else {
          return PathTool.map.marker.station.wifi;
        }
      default:
        if (this.is.stay(this.data, flags)) {
          return PathTool.map.marker.station.stay;
        } else if (this.is.full(flags)) {
          return PathTool.map.marker.station.full;
        } else {
          return PathTool.map.marker.station;
        }
    }
  }

  is = {
    stay: (data: GarbageStationViewModel, flags: Flags<StationState>) => {
      if (this.is.error(flags)) {
        return false;
      }
      return !!data.Statistic && data.Statistic.CurrentGarbageTime;
    },
    full: (flags: Flags<StationState>) => {
      if (this.is.error(flags)) {
        return false;
      }
      return flags.contains(StationState.Full);
    },
    error: (flags: Flags<StationState>) => {
      return flags.contains(StationState.Error);
    },
  };

  private init = {
    normal: () => {
      let image = this.path.normal;
      let flags = new Flags(this.data.StationState);
      if (this.is.error(flags) && 'offline' in this.path) {
        image = this.path.offline;
      }

      return {
        ...this.opts,
        image: image,
      };
    },
    hover: () => {
      let image = this.path.hover;
      let flags = new Flags(this.data.StationState);

      if (this.is.error(flags) && 'offline' in this.path) {
        image = this.path.offline;
      }

      return {
        ...this.opts,
        image: image,
      };
    },
    selected: () => {
      let image = this.path.selected;
      let flags = new Flags(this.data.StationState);
      if (this.is.error(flags) && 'offline' in this.path) {
        image = this.path.offline;
      }
      return {
        ...this.opts,
        image: image,
      };
    },
  };
}
