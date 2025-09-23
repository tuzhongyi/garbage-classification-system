import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';

export class GarbageManagementMapAMapInfoDetailsController {
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

  private content = {
    get: () => {},
    title: () => {},
    info: () => {},
    statistic: () => {},
  };

  add(data: GarbageStation) {
    if (data && data.GisPoint) {
      let location: [number, number] = [
        data.GisPoint.Longitude,
        data.GisPoint.Latitude,
      ];
      let content = `<div class="amap-info-window">
                        <div class="amap-info-window-content garbagestation">${data.Name}</div>                                              
                    </div>`;
      this.marker.setContent(content);
      this.marker.setPosition(location);
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

class InfoContent {
  get(data: GarbageStation) {
    return `<div class="amap-info-window">
                        <div class="amap-info-window-content garbagestation">${data.Name}</div>                                              
                    </div>`;
  }
  title(data: GarbageStation) {
    return `<div class="amap-garbage-station-head>${data.Name}</div>`;
  }
  info(data: GarbageStation) {
    let html = [`<div class="amap-garbage-station-info>`];
    html.push(`</div>`);
  }
  statistic() {}
}
