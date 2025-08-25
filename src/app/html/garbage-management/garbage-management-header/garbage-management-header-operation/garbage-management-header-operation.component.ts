import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../common/network/model/garbage-station/user.model';

@Component({
  selector: 'howell-garbage-management-header-operation',
  imports: [],
  templateUrl: './garbage-management-header-operation.component.html',
  styleUrl: './garbage-management-header-operation.component.less',
})
export class GarbageManagementHeaderOperationComponent {
  @Input() user?: User;
  @Output() setting = new EventEmitter<void>();

  on = {
    setting: () => {
      this.setting.emit();
    },
    help: () => {},
  };
}
