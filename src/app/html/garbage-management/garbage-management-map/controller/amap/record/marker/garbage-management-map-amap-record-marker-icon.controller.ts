import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { IMapIcon } from '../../../../garbage-management-map.model';

export class GarbageManagementMapAMapRecordMarkerIconController
  implements IMapIcon<AMap.LabelMarkerIconOptions>
{
  constructor() {
    this.normal = this.opts;
  }
  normal: AMap.LabelMarkerIconOptions;

  private get opts(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      size: SizeTool.map.marker.station,
      image: PathTool.map.marker.ias,
      anchor: 'center',
    };
    return icon;
  }
}
