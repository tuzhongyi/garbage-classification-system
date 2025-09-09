import { MapDivision } from '../../../../../../common/network/request/map/map-division.model';
import { GarbageManagementMapAMapConfig } from '../garbage-management-map-amap.config';
import { GarbageManagementMapAMapConverter } from '../garbage-management-map-amap.converter';

export class GarbageManagementMapAMapRootWallController {
  constructor(private loca: Loca.Container) {
    this.layer = this.init();
  }

  private layer: Loca.PolygonLayer;

  private style = {
    sideTopColor: 'rgba(56, 186, 255,0.1)',
    sideBottomColor: '#38baff',
    height: 70,
    altitude: GarbageManagementMapAMapConfig.height,
  };

  private init() {
    var layer = new Loca.PolygonLayer({
      zIndex: 11,
      cullface: 'none',
      shininess: 1,
      hasBottom: false,
      blockHide: false,
      hasSide: true,
      hasTop: false,
      depth: true,
      zooms: [2, 23],
    });

    return layer;
  }

  private _load(data: Loca.GeoJSONSource) {
    this.layer.setSource(data);
    this.layer.setStyle(this.style);
    this.loca.add(this.layer);
  }
  load(datas: MapDivision[]) {
    let geo = GarbageManagementMapAMapConverter.geo.polygon.array(datas);
    let source = new Loca.GeoJSONSource({ data: geo });
    this._load(source);
  }
}
