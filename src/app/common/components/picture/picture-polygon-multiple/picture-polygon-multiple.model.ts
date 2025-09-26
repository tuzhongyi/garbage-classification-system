import { Point } from '../../../network/model/garbage-station/point.model';

export class DrawPolygon extends Array<Point> {
  constructor(items?: Point[]) {
    super(...(items || []));
  }
  color?: string;
  Confidence?: string;
}
