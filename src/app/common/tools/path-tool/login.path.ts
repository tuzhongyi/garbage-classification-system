export class LoginPath {
  constructor(node: string) {
    this.base = `${node}/assets/image/login`;
  }
  private base: string;

  get jpg() {
    return `${this.base}/login.jpg`;
  }
  get mp4() {
    return `${this.base}/login.mp4`;
  }
}
