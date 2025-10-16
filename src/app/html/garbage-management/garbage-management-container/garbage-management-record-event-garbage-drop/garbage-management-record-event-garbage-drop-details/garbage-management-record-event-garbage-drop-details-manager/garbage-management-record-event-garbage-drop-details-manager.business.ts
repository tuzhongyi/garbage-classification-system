import { Injectable } from '@angular/core';
import { GarbageStationRequestService } from '../../../../../../common/network/request/garbage/garbage-station/garbage-station-request.service';

@Injectable()
export class GarbageManagementRecordEventGarbageDropDetailsManagerBusiness {
  constructor(private service: GarbageStationRequestService) {}

  get(stationId: string) {
    return this.service.cache.get(stationId);
  }

  download = {
    video: (stationId: string, cameraId: string, time: Date) => {
      this.service.download.video(stationId, cameraId, time);
    },
    image: (url: string, name: string, time: Date) => {
      this.service.download.image(url, name, time);
    },
  };
}
