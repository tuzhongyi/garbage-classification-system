import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { IMapIcon } from '../../../../garbage-management-map.model';

export class GarbageManagementMapAMapDeviceMarkerIconController
  implements IMapIcon<AMap.LabelMarkerIconOptions>
{
  constructor() {
    this.normal = this.opts;
  }
  normal: AMap.LabelMarkerIconOptions;

  private get opts(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      size: SizeTool.map.marker.patrol,
      image: PathTool.map.marker.patrol,
      anchor: 'bottom-center',
    };
    return icon;
  }
}
