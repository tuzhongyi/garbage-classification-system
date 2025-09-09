import { MapMarkerPath } from './marker/map-marker.path';

export class MapPath {
  private base = '/assets/image/map';

  marker = new MapMarkerPath(`${this.base}/markers`);

  state = `${this.base}/states/map-state-black.png`;
}
