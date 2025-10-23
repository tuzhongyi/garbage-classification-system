export class ConfigPath {
  constructor(node: string) {
    this.base = `${node}/assets/config`;
  }
  private base: string;

  get version() {
    return `${this.base}/version.json`;
  }
}
