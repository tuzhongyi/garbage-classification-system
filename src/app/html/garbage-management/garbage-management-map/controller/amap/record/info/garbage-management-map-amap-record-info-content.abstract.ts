export abstract class GarbageManagementMapAMapRecordInfoContentAbstract<T> {
  abstract load(data: T): string;

  protected classname = new Classname();

  protected item(icon: string, value: string) {
    return `<div class="${this.classname.item}">
    <div class="${this.classname.icon}"><i class="${icon}"></i></div>
    <div class="${this.classname.value}">${value}</div>
    </div>`;
  }
}

class Classname {
  constructor(base = 'amap-info-window-content') {
    this.basic = base;
  }

  basic: string;

  get title() {
    return `${this.basic}-title`;
  }

  get item() {
    return `${this.basic}-item`;
  }

  get icon() {
    return `${this.item}-icon`;
  }

  get value() {
    return `${this.item}-value`;
  }
}
