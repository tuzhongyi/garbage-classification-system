import { EqualsTool } from '../../../tools/equals-tool/equals.tool';
import { ObjectTool } from '../../../tools/object-tool/object.tool';
import { DrawPolygon } from './picture-polygon-multiple.model';

export class PictureCanvasController {
  set show(value: boolean) {
    this.canvas.style.display = value ? '' : 'none';
  }
  constructor(private canvas: HTMLCanvasElement) {}

  load(polygon: DrawPolygon[] = []) {
    this.clear();
    for (let i = 0; i < polygon.length; i++) {
      this.loadPolygon(polygon[i]);
    }
  }

  private draw(points: DrawPolygon) {
    if (points.length > 0) {
      let width = this.canvas.width;
      let height = this.canvas.height;
      const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

      ctx.strokeStyle = points.color ?? 'red';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(points[0].X * width, points[0].Y * height);
      for (let i = 1; i < points.length; i++) {
        const point = points[i];
        ctx.lineTo(point.X * width, point.Y * height);
      }
      ctx.stroke();

      ctx.closePath();
    }
  }
  clear(ctx?: CanvasRenderingContext2D) {
    if (!ctx) {
      ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  private loadPolygon(polygon: DrawPolygon) {
    let points = ObjectTool.clone(polygon);
    if (points.length > 1) {
      let first = polygon[0];
      let last = polygon[polygon.length - 1];
      if (!EqualsTool.Point(first, last)) {
        points.push(first);
      }
    }
    this.draw(points);
  }
}
