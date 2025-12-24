import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerExpandCornerComponent } from '../../../../common/components/container/container-expand-corner/container-expand-corner.component';

@Component({
  selector: 'howell-garbage-management-manager-map-ias-extend-control',
  imports: [CommonModule, FormsModule, ContainerExpandCornerComponent],
  templateUrl:
    './garbage-management-manager-map-ias-extend-control.component.html',
  styleUrl:
    './garbage-management-manager-map-ias-extend-control.component.less',
})
export class GarbageManagementManagerMapIasExtendControlComponent {
  @Input() top = true;
  @Input() left = false;
  @Input() heatmap = false;
  @Output() heatmapChange = new EventEmitter<boolean>();

  on = {
    heatmap: () => {
      this.heatmapChange.emit(this.heatmap);
    },
  };
}
