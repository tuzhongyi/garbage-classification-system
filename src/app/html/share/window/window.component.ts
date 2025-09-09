import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WindowComponent } from '../../../common/components/window/window.component';
import { WindowViewModel } from '../../../common/components/window/window.model';

@Component({
  selector: 'howell-window',
  imports: [CommonModule, WindowComponent],
  templateUrl: './window.component.html',
  styleUrl: './window.component.less',
})
export class HowellWindowComponent {
  @Input() model: WindowViewModel = new WindowViewModel();
  @Input() title = '';
  @Input() button = true;

  private _style: any = {
    width: '50%',
    height: '70%',
    padding: '10px',
  };
  public get style(): any {
    return this._style;
  }
  @Input() public set style(v: any) {
    this._style = Object.assign(this._style, v);
  }
}
