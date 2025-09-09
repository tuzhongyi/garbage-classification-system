import { EventType } from '../../../../../../../common/enum/event-type.enum';
import { StationState } from '../../../../../../../common/enum/station-state.enum';
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
    this.hover = this.init.hover();
    this.selected = this.init.selected();
  }
  normal: AMap.LabelMarkerIconOptions;
  hover: AMap.LabelMarkerIconOptions;
  selected: AMap.LabelMarkerIconOptions;

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
    if (this.data.Eventables.includes(EventType.MixedInto)) {
      return PathTool.map.marker.mixedinto;
    }
    if (
      this.data.Eventables.includes(EventType.IllegalVehicle) ||
      this.data.Eventables.includes(EventType.ConstructionData)
    ) {
      return PathTool.map.marker.illegalvehicle;
    }
    if (this.data.Eventables.includes(EventType.IllegalDrop)) {
      return PathTool.map.marker.illegaldrop;
    }
    return undefined;
  }

  private init = {
    normal: () => {
      let image = PathTool.map.marker.unknow;
      let flags = new Flags(this.data.StationState);
      if (this.path) {
        if (flags.contains(StationState.Error)) {
          image = this.path.offline;
        } else if (
          flags.contains(StationState.Full) ||
          (this.data.Statistic && this.data.Statistic.CurrentGarbageTime)
        ) {
          image = this.path.event.normal;
        } else {
          image = this.path.normal;
        }
      }
      return {
        ...this.opts,
        image: image,
      };
    },
    hover: () => {
      let image = PathTool.map.marker.unknow;
      let flags = new Flags(this.data.StationState);
      if (this.path) {
        if (flags.contains(StationState.Error)) {
          image = this.path.offline;
        } else if (
          flags.contains(StationState.Full) ||
          (this.data.Statistic && this.data.Statistic.CurrentGarbageTime)
        ) {
          image = this.path.event.hover;
        } else {
          image = this.path.hover;
        }
      }
      return {
        ...this.opts,
        image: image,
      };
    },
    selected: () => {
      let image = PathTool.map.marker.unknow;
      let flags = new Flags(this.data.StationState);
      if (this.path) {
        if (flags.contains(StationState.Error)) {
          image = this.path.offline;
        } else if (
          flags.contains(StationState.Full) ||
          (this.data.Statistic && this.data.Statistic.CurrentGarbageTime)
        ) {
          image = this.path.event.selected;
        } else {
          image = this.path.selected;
        }
      }
      return {
        ...this.opts,
        image: image,
      };
    },
  };
}
