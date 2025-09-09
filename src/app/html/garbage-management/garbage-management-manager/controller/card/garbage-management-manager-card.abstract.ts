import { ComponentTool } from '../../../../../common/tools/component-tool/component.tool';
import { wait } from '../../../../../common/tools/tools';
import {
  GarbageManagementManagerCardItem,
  IGarbageManagementManagerCardElement,
} from '../../garbage-management-manager.model';

export abstract class GarbageManagementManagerCardAbstract {
  constructor(private tool: ComponentTool) {
    this.html = this.init();
  }
  protected abstract ctors: Array<GarbageManagementManagerCardItem>;
  html: Promise<Array<IGarbageManagementManagerCardElement>>;

  private create(ctor: GarbageManagementManagerCardItem) {
    let component = this.tool.create(ctor.component, ctor.args);
    let element = this.tool.get.html(component);
    return element;
  }

  init() {
    return new Promise<IGarbageManagementManagerCardElement[]>((resolve) => {
      wait(
        () => {
          return !!this.ctors && this.ctors.length > 0;
        },
        () => {
          let elements = [];
          for (let i = 0; i < this.ctors.length; i++) {
            const ctor = this.ctors[i];
            let element = this.create(ctor);
            elements.push({
              element: element,
              class: ctor.class,
            });
          }
          resolve(elements);
        }
      );
    });
  }
}
