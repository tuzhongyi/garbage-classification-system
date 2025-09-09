import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GarbageManagementControlButtonIcon } from './garbage-management-control-button.model';

@Component({
  selector: 'howell-garbage-management-control-button',
  imports: [CommonModule],
  templateUrl: './garbage-management-control-button.component.html',
  styleUrl: './garbage-management-control-button.component.less',
})
export class GarbageManagementControlButtonComponent {
  @Input() name = '';
  @Input() icon = GarbageManagementControlButtonIcon.home;
  @Input() selected = false;
}
