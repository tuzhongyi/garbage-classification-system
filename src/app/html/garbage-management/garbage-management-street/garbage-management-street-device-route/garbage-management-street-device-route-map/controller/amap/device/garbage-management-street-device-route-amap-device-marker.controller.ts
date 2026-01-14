import { IasDevice } from '../../../../../../../../common/network/model/ias/ias-device.model';
import { IasGpsItem } from '../../../../../../../../common/network/model/ias/ias-gps-item.model';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';
import {
  IMapIcon,
  MapPointEvent,
} from '../../../../../../garbage-management-map/garbage-management-map.model';

export class GarbageManagementStreetDeviceRouteAMapDeviceMarkerController {
  event = new MapPointEvent<IasDevice>();
  constructor(
    private data: IasDevice,
    private icon: IMapIcon<AMap.LabelMarkerIconOptions>
  ) {
    this.marker = this.create(data, icon.normal);
  }

  marker: AMap.LabelMarker;
  private selected = false;

  private create(data: IasDevice, icon: AMap.LabelMarkerIconOptions) {
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
      this.hover();
      this.event.mouseover.emit(this.data);
    });
    marker.on('mouseout', (e: any) => {
      this.out();
      this.event.mouseout.emit(this.data);
    });
    marker.on('click', (e: any) => {
      this.event.click.emit(this.data);
      this.select();
    });
    marker.on('dblclick', (e: any) => {
      this.event.dblclick.emit(this.data);
    });
  }

  async hover() {
    if (this.selected) return;

    if (this.icon.hover) {
      this.marker.setIcon(this.icon.hover);
    }
    this.marker.setzIndex(2);
  }
  async out() {
    if (this.selected) return;
    this.marker.setIcon(this.icon.normal);
    this.marker.setzIndex(1);
  }
  async select() {
    if (this.selected) return;
    this.selected = true;

    if (this.icon.selected) {
      this.marker.setIcon(this.icon.selected);
    }
    this.marker.setzIndex(3);
  }
  async blur() {
    if (!this.selected) return;
    this.selected = false;

    this.marker.setIcon(this.icon.normal);
    this.marker.setzIndex(1);
  }

  set = {
    position: (data: IasGpsItem) => {
      let position: [number, number] = GeoTool.point.convert.wgs84.to.gcj02(
        data.Longitude,
        data.Latitude
      );
      this.marker.setPosition(position);
    },
  };
}
