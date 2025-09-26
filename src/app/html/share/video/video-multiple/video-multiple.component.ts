import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { VideoImageComponent } from '../video-image/video-image.component';
import { VideoArgs } from './video-multiple.model';

@Component({
  selector: 'howell-video-multiple',
  imports: [CommonModule, VideoImageComponent],
  templateUrl: './video-multiple.component.html',
  styleUrl: './video-multiple.component.less',
})
export class VideoMultipleComponent implements OnChanges {
  @Input() datas: VideoArgs[] = [];
  @Input() playable = true;
  @Output() play = new EventEmitter<number>();

  items: (VideoArgs | undefined)[] = [];
  pow = 1;
  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['datas']);
  }
  change = {
    data: (change: SimpleChange) => {
      if (change) {
        if (this.datas.length === 0) {
          this.items = [];
          this.pow = 1;
          return;
        }
        let sqrt = Math.ceil(Math.sqrt(this.datas.length));
        this.pow = Math.pow(sqrt, 2);

        this.items = [...this.datas];

        while (this.items.length < this.pow) {
          this.items.push(undefined);
        }
      }
    },
  };

  on = {
    click: (index: number, item?: VideoArgs) => {
      if (this.playable) {
        return;
      }
      if (item) {
        this.play.emit(index);
      }
    },
  };
}
