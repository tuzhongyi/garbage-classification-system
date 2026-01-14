import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../common/components/select/hw-select/select-control.component';
import { GarbageManagementManagerIasHeatmapArgs } from '../../garbage-management-manager/garbage-management-manager.model';

@Component({
  selector: 'howell-garbage-management-manager-map-ias-extend-heatmap',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
  ],
  templateUrl:
    './garbage-management-manager-map-ias-extend-heatmap.component.html',
  styleUrl:
    './garbage-management-manager-map-ias-extend-heatmap.component.less',
})
export class GarbageManagementManagerMapIasExtendHeatmapComponent {
  @Input() args = new GarbageManagementManagerIasHeatmapArgs();
  @Output() argsChange =
    new EventEmitter<GarbageManagementManagerIasHeatmapArgs>();
  @Output() close = new EventEmitter<void>();

  @Input() textable = true;
  @Output() textableChange = new EventEmitter<boolean>();

  on = {
    change: () => {
      this.argsChange.emit(this.args);
    },
    close: () => {
      this.close.emit();
    },
    textable: () => {
      this.textableChange.emit(this.textable);
    },
  };
}
