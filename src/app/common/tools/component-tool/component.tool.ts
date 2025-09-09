import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ComponentTool {
  constructor(
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}
  public create<T>(component: any, inputs?: Partial<T>): ComponentRef<T> {
    // 创建组件
    const factory = this.cfr.resolveComponentFactory(component);
    const componentRef: ComponentRef<T> = factory.create(
      this.injector
    ) as ComponentRef<T>;

    // 设置 @Input
    Object.assign(componentRef.instance as any, inputs);

    // 挂载到 Angular 应用
    this.appRef.attachView(componentRef.hostView);

    // 触发渲染
    componentRef.changeDetectorRef.detectChanges();

    // 获取 DOM
    // const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;

    // return domElem;

    return componentRef;
  }

  get = {
    html: <T>(component: ComponentRef<T>) => {
      const element = (component.hostView as any).rootNodes[0] as HTMLElement;
      return element;
    },
    string: <T>(component: ComponentRef<T>) => {
      let element = this.get.html(component);
      return element.outerHTML;
    },
  };
}
