import { IasEventRecord } from '../../../../../../../common/network/model/ias/ias-event-record.model';
import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { IMapIcon } from '../../../../garbage-management-map.model';

export class GarbageManagementMapAMapRecordMarkerIconController
  implements IMapIcon<AMap.LabelMarkerIconOptions>
{
  constructor(data: IasEventRecord) {
    this.normal = this.opts;
    if (data.IsTimeout) {
      this.normal.image = PathTool.map.marker.ias.red;
    }
  }
  normal: AMap.LabelMarkerIconOptions;

  private get opts(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      size: SizeTool.map.marker.station,
      image: PathTool.map.marker.ias.orange,
      anchor: 'center',
    };
    return icon;
  }
}
