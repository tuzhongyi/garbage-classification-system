import { MixedIntoEventRecord } from '../../../../network/model/garbage-station/event-record/mixed-into-event-record.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';

export class MixedIntoEventRecordTool {
  cameras(data: MixedIntoEventRecord) {
    let cameras: CameraImageUrl[] = [];

    let trigger = new CameraImageUrl();
    trigger.CameraId = data.ResourceId ?? '';
    trigger.CameraName = data.ResourceName;
    trigger.ImageUrl = data.ImageUrl ?? '';
    trigger.Objects = data.Data.Objects;
    trigger.Rules = data.Data.Rules;

    cameras.push(trigger);

    if (data.Data.HandleImageUrl) {
      let handle = new CameraImageUrl();
      handle.CameraId = data.ResourceId ?? '';
      handle.CameraName = data.ResourceName;
      handle.ImageUrl = data.Data.HandleImageUrl ?? '';
      handle.Objects = data.Data.Objects;
      handle.Rules = data.Data.Rules;
      cameras.push(handle);
    }

    return cameras;
  }
}
