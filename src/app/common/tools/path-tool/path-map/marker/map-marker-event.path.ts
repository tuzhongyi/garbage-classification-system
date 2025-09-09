import { MapMarkerPathAbstract } from './map-marker.path.abstract';

export class MapMarkerEventPath extends MapMarkerPathAbstract {
  constructor(base: string) {
    super(`${base}-event`);
  }
}
