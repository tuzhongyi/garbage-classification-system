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

@Component({
  selector: 'howell-paginator-point',
  imports: [CommonModule],
  templateUrl: './paginator-point.component.html',
  styleUrl: './paginator-point.component.less',
})
export class PaginatorPointComponent implements OnChanges {
  @Input() count = 1;
  @Input() index = 1;
  @Output() indexChange = new EventEmitter<number>();
  @Output('change') _change = new EventEmitter<number>();

  items: number[] = [];

  private change = {
    count: (simple: SimpleChange) => {
      if (simple) {
        this.items = [];
        for (let i = 0; i < this.count; i++) {
          this.items.push(i + 1);
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.count(changes['count']);
  }

  on = {
    change: (index: number) => {
      this.index = index;
      this.indexChange.emit(this.index);
      this._change.emit(this.index);
    },
  };
}
