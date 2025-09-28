import { MapMarkerPathAbstract } from '../map-marker.path.abstract';

export class MapMarkerStateStayPath extends MapMarkerPathAbstract {
  constructor(base: string) {
    super(`${base}-stay`);
  }
}
