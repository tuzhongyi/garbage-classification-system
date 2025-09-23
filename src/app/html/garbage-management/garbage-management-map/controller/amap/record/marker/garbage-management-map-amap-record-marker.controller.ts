import { IasEventRecord } from '../../../../../../../common/network/model/ias/ias-event-record.model';
import {
  IMapIcon,
  MapPointEvent,
} from '../../../../garbage-management-map.model';

export class GarbageManagementMapAMapRecordMarkerController {
  event = new MapPointEvent<IasEventRecord>();
  constructor(
    private data: IasEventRecord,
    private icon: IMapIcon<AMap.LabelMarkerIconOptions>
  ) {
    this.marker = this.create(data, icon.normal);
  }

  marker: AMap.LabelMarker;
  private selected = false;

  private create(data: IasEventRecord, icon: AMap.LabelMarkerIconOptions) {
    let position: [number, number] = [
      data.Location?.Longitude ?? 121.31,
      data.Location?.Latitude ?? 31.121,
    ];
    let marker = new AMap.LabelMarker({
      icon: icon,
      position: position,
    });
    this.regist(marker);
    return marker;
  }

  private regist(marker: AMap.LabelMarker) {
    marker.on('mouseover', (e: any) => {
      this.event.mouseover.emit(this.data);
    });
    marker.on('mouseout', (e: any) => {
      this.event.mouseout.emit(this.data);
    });
    marker.on('click', (e: any) => {
      this.event.click.emit(this.data);
    });
    marker.on('dblclick', (e: any) => {
      this.event.dblclick.emit(this.data);
    });
  }
}
