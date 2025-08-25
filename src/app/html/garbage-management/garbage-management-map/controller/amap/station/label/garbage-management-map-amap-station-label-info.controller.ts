export class GarbageManagementMapAMapStationLabelInfoController {
  constructor(private map: AMap.Map) {}

  private style = {
    padding: '.75rem 1.25rem',
    'margin-bottom': '1rem',
    'border-radius': '.25rem',
    'background-color': 'white',
    width: '15rem',
    'border-width': 0,
    'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
    'text-align': 'center',
    'font-size': '20px',
    color: 'blue',
  };

  load(name: string, position: [number, number]) {
    let info = new AMap.Text({
      text: name,
      anchor: 'bottom-center',
      position: position,
      offset: new AMap.Pixel(0, -20),
      style: this.style,
    });
    info.setMap(this.map);
  }
}
