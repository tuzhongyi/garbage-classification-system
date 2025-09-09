import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HowellBaseRequestService } from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { MediumAudioRequestService } from './audio/medium-audio-request.service';
import { MediumFileRequestService } from './file/medium-file-request.service';
import { MediumPictureRequestService } from './picture/medium-picture-request.service';
import { MediumVideoRequestService } from './video/medium-video-request.service';

@Injectable({
  providedIn: 'root',
})
export class MediumRequestService {
  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
  }
  private basic: HowellBaseRequestService;

  private _picture?: MediumPictureRequestService;
  public get picture(): MediumPictureRequestService {
    if (!this._picture) {
      this._picture = new MediumPictureRequestService(this.basic);
    }
    return this._picture;
  }

  private _file?: MediumFileRequestService;
  public get file(): MediumFileRequestService {
    if (!this._file) {
      this._file = new MediumFileRequestService(this.basic);
    }
    return this._file;
  }

  private _video?: MediumVideoRequestService;
  public get video(): MediumVideoRequestService {
    if (!this._video) {
      this._video = new MediumVideoRequestService(this.basic);
    }
    return this._video;
  }

  private _audio?: MediumAudioRequestService;
  public get audio(): MediumAudioRequestService {
    if (!this._audio) {
      this._audio = new MediumAudioRequestService(this.basic);
    }
    return this._audio;
  }
}
