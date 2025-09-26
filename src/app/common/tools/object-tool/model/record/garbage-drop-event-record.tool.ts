import { GarbageDropEventRecord } from '../../../../network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { CameraImageUrl } from '../../../../network/model/url-model/camera-image-url.model';
import { PicturesUrl } from '../../../../network/url/aiop/medium/pictures/pictures.url';

export class GarbageDropEventRecordTool {
  images(data: GarbageDropEventRecord) {
    let keys = this.keys(data);
    let images: string[] = [];
    for (let i = 0; i < keys.length; i++) {
      images.push(PicturesUrl.jpg(keys[i]));
    }
    return images;
  }

  keys(data: GarbageDropEventRecord) {
    const images: string[] = [];
    if (data.Data.DropImageUrls) {
      images.push(...data.Data.DropImageUrls.map((url) => url.ImageUrl));
    }
    if (data.Data.TimeoutImageUrls) {
      images.push(...data.Data.TimeoutImageUrls.map((url) => url.ImageUrl));
    }
    if (data.Data.HandleImageUrls) {
      images.push(...data.Data.HandleImageUrls.map((url) => url.ImageUrl));
    }
    return images;
  }

  cameras(data: GarbageDropEventRecord) {
    const cameras: CameraImageUrl[] = [];
    if (data.Data.DropImageUrls) {
      cameras.push(...data.Data.DropImageUrls.map((url) => url));
    }
    if (data.Data.TimeoutImageUrls) {
      cameras.push(...data.Data.TimeoutImageUrls.map((url) => url));
    }
    if (data.Data.HandleImageUrls) {
      cameras.push(...data.Data.HandleImageUrls.map((url) => url));
    }
    return cameras;
  }
}
