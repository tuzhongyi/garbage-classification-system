import { Point } from '../../network/model/garbage-station/point.model';

export class EqualsTool {
  static Point(p1: Point, p2: Point): boolean {
    return p1.X === p2.X && p1.Y === p2.Y;
  }
}
