import { formatDate } from '@angular/common';
import { DateTimeTool } from '../../../../../tools/date-time-tool/datetime.tool';
import { Duration } from '../../../../model/garbage-station/duration.model';
import { CameraDownloadFileParams } from '../garbage-station-request.params';
import { GarbageStationRequestService } from '../garbage-station-request.service';

export class GarbageStationDownloadRequestService {
  constructor(private stationService: GarbageStationRequestService) {}
  video(stationId: string, cameraId: string, args: Duration): void;
  video(stationId: string, cameraId: string, args: Date): void;
  video(stationId: string, cameraId: string, args: Duration | Date) {
    let duration: Duration;
    if (args instanceof Date) {
      duration = DateTimeTool.beforeOrAfter(args);
    } else {
      duration = args;
      const interval = duration.end.getTime() - duration.begin.getTime();
      if (interval > 5 * 60 * 1000) {
        duration.end.setTime(duration.begin.getTime() + 5 * 1000 * 60);
      }
    }

    let params = new CameraDownloadFileParams();
    params.CameraId = cameraId;
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.GarbageStationId = stationId;
    const response = this.stationService.camera.file.download(params);
    response.then((data) => {
      if (data && data.Url) {
        const a = document.createElement('a');
        a.href = data.Url;
        a.click();
        document.body.appendChild(a);
        document.body.removeChild(a);
      }
    });
  }

  image(url: string, name: string, time: Date) {
    const a = document.createElement('a');
    a.href = url;
    a.download =
      name + ' ' + formatDate(time, 'yyyy_MM_dd HH:mm:ss', 'en') + '.jpeg';
    a.click();
    document.body.appendChild(a);
    document.body.removeChild(a);
  }
}
