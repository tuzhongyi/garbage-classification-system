import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IasEventRecord } from '../../../common/network/model/ias/ias-event-record.model';
import { GarbageManagementManagerMapController } from './controller/garbage-management-manager-map.controller';

@Component({
  selector: 'howell-garbage-management-manager-map',
  imports: [CommonModule],
  templateUrl: './garbage-management-manager-map.component.html',
  styleUrl: './garbage-management-manager-map.component.less',
  providers: [GarbageManagementManagerMapController],
})
export class GarbageManagementManagerMapComponent implements OnInit, OnDestroy {
  @Input() data?: IasEventRecord;

  constructor(private controller: GarbageManagementManagerMapController) {}

  ngOnInit(): void {
    if (this.data) {
      this.controller.load(this.data);
    }
  }
  ngOnDestroy(): void {
    this.controller.destroy();
  }
}
