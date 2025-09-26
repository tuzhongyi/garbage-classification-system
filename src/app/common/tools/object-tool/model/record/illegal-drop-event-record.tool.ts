import { IllegalDropEventRecord } from '../../../../network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';

export class IllegalDropEventRecordTool {
  cameras(data: IllegalDropEventRecord) {
    let camera = new CameraImageUrl();
    camera.CameraId = data.ResourceId ?? '';
    camera.CameraName = data.ResourceName;
    camera.ImageUrl = data.ImageUrl ?? '';
    camera.Objects = data.Data.Objects;
    camera.Rules = data.Data.Rules;
    return [camera];
  }
}
