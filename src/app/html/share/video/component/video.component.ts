import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoPlayerComponent } from '../../../../common/components/video-player/video-player.component';
import { VideoBusiness } from './video.business';
import { VideoPlaybackArgs, VideoPreviewArgs } from './video.model';

@Component({
  selector: 'howell-video',
  imports: [CommonModule, VideoPlayerComponent],
  templateUrl: './video.component.html',
  styleUrl: './video.component.less',
  providers: [VideoBusiness],
})
export class VideoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() preview?: EventEmitter<VideoPreviewArgs>;
  @Input() playback?: EventEmitter<VideoPlaybackArgs>;
  @Output() opened = new EventEmitter<void>();
  @Input() playing = false;
  @Output() playingChange = new EventEmitter<boolean>();

  constructor(private business: VideoBusiness) {}

  private subscription = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    this.change.preview(changes['preview']);
    this.change.playback(changes['playback']);
  }
  change = {
    preview: (change: SimpleChange) => {
      if (change) {
        if (this.preview) {
          let sub = this.preview.subscribe((args) => {
            this.video.preview.play(args);
          });
          this.subscription.add(sub);
        }
      }
    },
    playback: (change: SimpleChange) => {
      if (this.playback) {
        let sub = this.playback.subscribe((args) => {
          this.video.playback.play(args);
        });
        this.subscription.add(sub);
      }
    },
  };

  ngOnInit(): void {
    this.opened.emit();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  video = {
    src: '',
    preview: {
      args: undefined as VideoPreviewArgs | undefined,
      play: (args: VideoPreviewArgs) => {
        if (this.playing) {
          this.video.stop.emit();
        }
        this.video.preview.args = args;
        this.business.preview(args).then((x) => {
          let url = x.Url;
          if (url.indexOf('?') < 0 && x.Username && x.Password) {
            url += `?user=${x.Username}&password=${x.Password}`;
          }
          this.video.src = url;
        });
      },
    },
    playback: {
      args: undefined as VideoPlaybackArgs | undefined,
      play: (args: VideoPlaybackArgs) => {
        if (this.playing) {
          this.video.stop.emit();
        }
        this.business.playback(args).then((x) => {
          let url = x.Url;

          if (url.indexOf('?') < 0 && x.Username && x.Password) {
            url += `?user=${x.Username}&password=${x.Password}`;
          }
          this.video.src = url;
        });
      },
    },
    stop: new EventEmitter<void>(),
  };

  on = {
    playing: () => {
      this.playing = true;
      this.playingChange.emit(this.playing);
    },
    stoping: () => {
      this.playing = false;
      this.playingChange.emit(this.playing);
      this.video.src = '';
    },
  };
}
