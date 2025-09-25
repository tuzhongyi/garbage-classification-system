export class EqualsTool {
  static Point(
    p1: { X: number; Y: number },
    p2: { X: number; Y: number }
  ): boolean {
    return p1.X === p2.X && p1.Y === p2.Y;
  }
}
