import { GarbageManagementMapAMapConfigController as Config } from '../garbage-management-map-amap.config';

export class GarbageManagementMapAMapRootBorderController {
  constructor(private loca: Loca.Container) {
    this.layer = this.init();
  }

  private layer: Loca.PulseLineLayer;
  private style = {
    altitude: Config.height + 0.1,
    lineWidth: 5,
    // 脉冲头颜色
    headColor: 'white',
    // 脉冲尾颜色
    trailColor: Config.color.border.root,

    interval: 0.5,
    // 脉冲线的速度，几秒钟跑完整段路
    duration: 5000,
  };

  private init() {
    var layer = new Loca.PulseLineLayer({
      zIndex: 10,
      opacity: 1,
      visible: true,
      zooms: [2, 23],
    });

    return layer;
  }

  load(data: Loca.GeoJSONSource) {
    this.layer.setSource(data);
    this.layer.setStyle(this.style);
    this.loca.add(this.layer);
  }
}
