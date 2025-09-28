import { MapMarkerPathAbstract } from '../map-marker.path.abstract';

export class MapMarkerStateFullPath extends MapMarkerPathAbstract {
  constructor(base: string) {
    super(`${base}-full`);
  }
}
