export class GarbageManagementMapAMapStationLabelController {
  constructor(private map: AMap.Map, zooms?: [number, number]) {
    this.info = this.init(zooms);
  }

  private info: AMap.InfoWindow;

  private init(zooms?: [number, number]) {
    let info = new AMap.InfoWindow({
      anchor: 'bottom-center',
      content: '',
      zooms: zooms,
    });
    return info;
  }

  open(name: string, position: [number, number]) {
    this.info.setContent(name);
    this.info.open(this.map, position);
  }

  close() {
    this.info.close();
  }
}
