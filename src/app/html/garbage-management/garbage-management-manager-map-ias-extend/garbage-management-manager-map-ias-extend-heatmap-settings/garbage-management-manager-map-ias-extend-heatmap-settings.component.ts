import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerExpandCornerComponent } from '../../../../common/components/container/container-expand-corner/container-expand-corner.component';

@Component({
  selector: 'howell-garbage-management-manager-map-ias-extend-heatmap-settings',
  imports: [CommonModule, FormsModule, ContainerExpandCornerComponent],
  templateUrl:
    './garbage-management-manager-map-ias-extend-heatmap-settings.component.html',
  styleUrl:
    './garbage-management-manager-map-ias-extend-heatmap-settings.component.less',
})
export class GarbageManagementManagerMapIasExtendHeatmapSettingsComponent {
  @Input() top = true;
  @Input() left = false;
  @Input() textable: boolean = false;
  @Output() textableChange = new EventEmitter<boolean>();

  on = {
    textable: () => {
      this.textableChange.emit(this.textable);
    },
  };
}
