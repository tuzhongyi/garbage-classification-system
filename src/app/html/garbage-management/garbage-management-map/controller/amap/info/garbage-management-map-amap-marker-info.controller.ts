import { GarbageManagementMapAMapInfo } from './garbage-management-map-amap-marker-info.model';

export class GarbageManagementMapAMapInfoController {
  constructor(
    private map: AMap.Map,
    opts?: {
      zooms?: [number, number];
      offset?: [number, number];
      class?: string;
    }
  ) {
    this.marker = this.init(opts?.zooms, opts?.offset);
    this.class = opts?.class;
  }

  private marker: AMap.Marker;
  private class?: string;

  private init(
    zooms: [number, number] = [0, 50],
    offset: [number, number] = [0, -80]
  ) {
    return new AMap.Marker({
      anchor: 'bottom-center',
      offset: offset,
      zooms: zooms,
    });
  }

  add(data: GarbageManagementMapAMapInfo) {
    if (data && data.Location) {
      let content = `<div class="amap-info-window ${this.class}">
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
