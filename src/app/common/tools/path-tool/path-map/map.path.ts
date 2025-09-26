import { MapMarkerPath } from './marker/map-marker.path';

export class MapPath {
  constructor(private node: string) {
    this.base = `${this.node}/assets/image/map`;
  }

  private base: string;

  get marker() {
    return new MapMarkerPath(`${this.base}/markers`);
  }

  get state() {
    return `${this.base}/states/map-state-black.png`;
  }
}
