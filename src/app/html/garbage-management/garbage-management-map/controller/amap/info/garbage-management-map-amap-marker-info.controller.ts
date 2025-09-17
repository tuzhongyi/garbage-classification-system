import { GarbageManagementMapAMapInfo } from './garbage-management-map-amap-marker-info.model';

export class GarbageManagementMapAMapInfoController {
  constructor(private map: AMap.Map, zooms?: [number, number]) {
    this.marker = this.init();
  }

  private marker: AMap.Marker;

  private init(zooms: [number, number] = [0, 50]) {
    return new AMap.Marker({
      anchor: 'bottom-center',
      offset: [0, -80],
      zooms: zooms,
    });
  }

  add(data: GarbageManagementMapAMapInfo) {
    if (data && data.Location) {
      let content = `<div class="amap-info-window">
                        <div class="amap-info-window-content">${data.Name}</div>                      
                        <div class="amap-info-sharp"></div>
                    </div>`;
      this.marker.setContent(content);
      this.marker.setPosition(data.Location);
      this.map.add(this.marker);
    }
    return undefined;
  }
  remove() {
    this.map.remove(this.marker);
  }

  set = {
    position: (position: [number, number]) => {
      this.marker.setPosition(position);
    },
  };
}
