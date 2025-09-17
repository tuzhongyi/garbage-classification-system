import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { PictureComponent } from '../../../../common/components/picture/component/picture.component';
import { VideoComponent } from '../component/video.component';
import { VideoPlaybackArgs, VideoPreviewArgs } from '../component/video.model';

@Component({
  selector: 'howell-video-image',
  imports: [CommonModule, VideoComponent, PictureComponent],
  templateUrl: './video-image.component.html',
  styleUrl: './video-image.component.less',
})
export class VideoImageComponent {
  @Input() image = '';
  @Input('preview') _preview?: VideoPreviewArgs;
  @Input('playback') _playback?: VideoPlaybackArgs;

  opened = false;
  playing = false;

  preview = new EventEmitter<VideoPreviewArgs>();
  playback = new EventEmitter<VideoPlaybackArgs>();

  on = {
    open: () => {
      this.opened = true;
    },
    play: () => {
      if (this._playback) {
        this.playback.emit(this._playback);
      } else if (this._preview) {
        this.preview.emit(this._preview);
      }
    },
  };
}
