import { LoginPath } from './login.path';
import { MapPath } from './path-map/map.path';

export class PathTool {
  private static node =
    location.port == `9527` ? `` : `/garbage-classification-system`;
  static map = new MapPath(this.node);

  static login = new LoginPath(this.node);
}
