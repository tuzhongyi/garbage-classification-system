type Constructor<T> = new (...args: any[]) => T;
export class ObjectFactoryTool {
  private classMap: Record<string, Constructor<any>> = {};
  // 注册类
  register<T>(name: string, ctor: Constructor<T>) {
    this.classMap[name] = ctor;
  }

  // 根据类名创建实例
  create<T>(name: string, ...args: any[]): T {
    const ctor = this.classMap[name];
    if (!ctor) {
      throw new Error(`Class '${name}' not found in Factory`);
    }
    return new ctor(...args);
  }
}
