import { Component, Input } from '@angular/core';

@Component({
  selector: 'howell-garbage-management-card-division-selection-item',
  imports: [],
  templateUrl:
    './garbage-management-card-division-selection-item.component.html',
  styleUrl: './garbage-management-card-division-selection-item.component.less',
})
export class GarbageManagementCardDivisionSelectionItemComponent {
  @Input() name: string = '';
  @Input() selected = false;
}
