import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GarbageManagementStateItem } from './garbage-management-state-item.model';

@Component({
  selector: 'howell-garbage-management-state-item',
  imports: [CommonModule],
  templateUrl: './garbage-management-state-item.component.html',
  styleUrl: './garbage-management-state-item.component.less',
})
export class GarbageManagementStateItemComponent {
  @Input() data = new GarbageManagementStateItem();
}
