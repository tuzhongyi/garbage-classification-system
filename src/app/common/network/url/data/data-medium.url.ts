import { BaseUrl } from '../base.url';
import { DataMediumAudioUrl } from './data-medium-audio.url';
import { DataMediumFileUrl } from './data-medium-file.url';
import { DataMediumPictureUrl } from './data-medium-picture.url';
import { DataMediumVideoUrl } from './data-medium-video.url';

export abstract class DataMediumUrl {
  protected static get basic(): string {
    return `${BaseUrl.medium}`;
  }

  static get picture() {
    return new DataMediumPictureUrl(this.basic);
  }
  static get file() {
    return new DataMediumFileUrl(this.basic);
  }
  static get video() {
    return new DataMediumVideoUrl(this.basic);
  }
  static get audio() {
    return new DataMediumAudioUrl(this.basic);
  }
  static server() {
    return `${this.basic}/Servers`;
  }
}
