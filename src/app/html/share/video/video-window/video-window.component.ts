import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DateTimeControlComponent } from '../../../../common/components/date-time/date-time-control/date-time-control.component';
import { TimeControlComponent } from '../../../../common/components/date-time/time-control/time-control.component';
import { TimeModel } from '../../../../common/components/date-time/time-control/time-control.model';
import { WindowComponent } from '../../../../common/components/window/window.component';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';
import { HowellWindowComponent } from '../../window/window.component';
import { VideoComponent } from '../component/video.component';
import { VideoPlaybackArgs, VideoPreviewArgs } from '../component/video.model';

@Component({
  selector: 'howell-video-window',
  imports: [
    CommonModule,
    HowellWindowComponent,
    VideoComponent,
    DateTimeControlComponent,
    TimeControlComponent,
  ],
  templateUrl: './video-window.component.html',
  styleUrl: './video-window.component.less',
})
export class VideoWindowComponent
  extends WindowComponent
  implements OnInit, OnDestroy
{
  @Input('preview') input_preview?: EventEmitter<VideoPreviewArgs>;
  @Input('playback') input_playback?: EventEmitter<VideoPlaybackArgs>;

  @Output() opened = new EventEmitter<void>();
  @Input() playing = false;
  @Output() playingChange = new EventEmitter<boolean>();

  constructor() {
    super();
    let time = new Date();
    time.setMinutes(time.getMinutes() - 30);
    let duration = DateTimeTool.before(time);
    this.datetime.time.begin = new TimeModel(duration.begin);
    this.datetime.time.end = new TimeModel(duration.end);
  }

  preview = new EventEmitter<VideoPreviewArgs>();
  playback = new EventEmitter<VideoPlaybackArgs>();
  private subscription = new Subscription();

  override ngOnInit(): void {
    if (this.input_preview) {
      let sub = this.input_preview.subscribe((args) => {
        this.video.preview.args = args;
        this.video.preview.play(args);
      });
      this.subscription.add(sub);
    }
    if (this.input_playback) {
      let sub = this.input_playback.subscribe((args) => {
        this.datetime.show = true;
        this.video.playback.args = args;
        if (args.duration) {
          this.datetime.date = args.duration.begin;
          this.datetime.time.begin = new TimeModel(args.duration.begin);
          this.datetime.time.end = new TimeModel(args.duration.end);
          this.video.playback.play(args);
        }
      });
      this.subscription.add(sub);
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  on = {
    opened: () => {
      this.opened.emit();
    },
    playing: (value: boolean) => {
      this.playing = value;
      this.playingChange.emit(value);
    },
    close: () => {
      this.Model.show = false;
    },
    preview: () => {
      this.datetime.show = false;
      this.video.preview.args = this.video.playback.args;
      if (this.video.preview.args) {
        this.video.preview.play(this.video.preview.args);
      }
    },
    playback: () => {
      this.datetime.show = true;
      if (this.video.preview.args) {
        let begin = new Date(this.datetime.date.getTime());
        begin.setHours(
          this.datetime.time.begin.hour,
          this.datetime.time.begin.minute,
          this.datetime.time.begin.second
        );
        let end = new Date(this.datetime.date.getTime());
        end.setHours(
          this.datetime.time.end.hour,
          this.datetime.time.end.minute,
          this.datetime.time.end.second
        );
        this.video.playback.args = {
          ...this.video.preview.args,
          duration: { begin, end },
        };
        this.datetime.show = true;
        // this.video.playback.play(this.video.playback.args);
      }
    },
  };

  datetime = {
    show: false,
    date: new Date(),
    time: {
      begin: new TimeModel(),
      end: new TimeModel(),
    },
    change: () => {
      if (this.video.playback.args) {
        let begin = new Date(this.datetime.date.getTime());
        begin.setHours(
          this.datetime.time.begin.hour,
          this.datetime.time.begin.minute,
          this.datetime.time.begin.second
        );
        let end = new Date(this.datetime.date.getTime());
        end.setHours(
          this.datetime.time.end.hour,
          this.datetime.time.end.minute,
          this.datetime.time.end.second
        );
        this.video.playback.args.duration = { begin, end };
      }
    },
  };

  video = {
    src: '',
    preview: {
      args: undefined as VideoPreviewArgs | undefined,
      play: (args: VideoPreviewArgs) => {
        this.preview.emit(args);
      },
    },
    playback: {
      args: undefined as VideoPlaybackArgs | undefined,
      play: (args: VideoPlaybackArgs) => {
        let day = new Date(this.datetime.date.getTime());
        let begin = new Date(day.getTime());
        begin.setHours(
          this.datetime.time.begin.hour,
          this.datetime.time.begin.minute,
          this.datetime.time.begin.second
        );
        let end = new Date(day.getTime());
        end.setHours(
          this.datetime.time.end.hour,
          this.datetime.time.end.minute,
          this.datetime.time.end.second
        );
        args.duration = { begin, end };
        this.playback.emit(args);
      },
    },
  };
}
