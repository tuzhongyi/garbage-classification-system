import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WindowViewModel } from '../../../common/components/window/window.model';

@Component({
  selector: 'howell-panel',
  imports: [CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.less',
})
export class HowellPanelComponent {
  @Input() title = '';
  protected _style: any = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  };
  public get style(): any {
    return this._style;
  }
  @Input() public set style(v: any) {
    this._style = Object.assign(this._style, v);
  }
  @Input() model: WindowViewModel = new WindowViewModel();
  @Input() button = true;

  @Output() close: EventEmitter<boolean> = new EventEmitter();

  on = {
    close: () => {
      this.model.show = false;
      this.close.emit(true);
    },
  };
}
