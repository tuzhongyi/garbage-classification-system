export class GarbageManagementMapAMapStationLabelLineController {
  constructor(private loca: Loca.Container) {
    this.layer = this.init();
  }

  private layer: Loca.LineLayer;
  private _hover?: string;
  private style: Loca.LineLayerStyle = {
    color: (i: number, feature: any) => {
      if (this._hover) {
        return 'rgba(0, 246, 255, 0.8)';
      }
      return 'rgba(0, 246, 255, 0)';
    },
  };

  private init() {
    let layer = new Loca.LineLayer({});
    return layer;
  }

  load(geo: Loca.GeoJSONSource) {
    this.layer.setSource(geo);
    this.layer.setStyle(this.style);
    this.loca.add(this.layer);
  }

  hover(id: string) {
    this._hover = id;
    this.layer.setStyle(this.style);
  }
  leave() {
    this._hover = undefined;
    this.layer.setStyle(this.style);
  }
}
