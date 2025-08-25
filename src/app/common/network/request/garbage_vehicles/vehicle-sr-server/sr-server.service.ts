import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { StreamType } from '../../../../enum/stream-type.enum';
import { Duration } from '../../../model/garbage-station/duration.model';
import { VideoUrl } from '../../../model/url.model';
import { GarbageVehicleSRServerUrl } from '../../../url/garbage-vehicle/sr-server.url';
import { HowellBaseRequestService } from '../../base-request-howell.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import {
  GetVehiclePreviewUrlParams,
  GetVehicleVodUrlParams,
} from './sr-server.params';

@Injectable({
  providedIn: 'root',
})
export class VehicleSRServerRequestService {
  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
  }
  private basic: HowellBaseRequestService;

  preview(
    args: GetVehiclePreviewUrlParams | string,
    stream: StreamType = StreamType.sub
  ) {
    let data: any;
    if (typeof args === 'string') {
      let params = new GetVehiclePreviewUrlParams();
      params.CameraId = args;
      params.StreamType = stream;
      data = instanceToPlain(params);
    } else {
      data = instanceToPlain(args);
    }

    let url = GarbageVehicleSRServerUrl.preview();
    return this.basic.post<VideoUrl>(url, VideoUrl, data);
  }

  playback(
    args: GetVehicleVodUrlParams | string,
    interval?: Duration,
    stream: StreamType = StreamType.main
  ) {
    let data: any;

    if (typeof args === 'string') {
      let params = new GetVehicleVodUrlParams();
      params.CameraId = args;
      params.BeginTime = interval!.begin;
      params.EndTime = interval!.end;
      params.StreamType = stream;
      data = instanceToPlain(params);
    } else {
      data = instanceToPlain(args);
    }

    let url = GarbageVehicleSRServerUrl.vod();
    return this.basic.post<VideoUrl>(url, VideoUrl, data);
  }
}
