import { ComponentTool } from '../../../../../common/tools/component-tool/component.tool';
import { wait } from '../../../../../common/tools/wait.tools';
import {
  GarbageManagementManagerCardItem,
  IGarbageManagementManagerCard,
  IGarbageManagementManagerCardElement,
} from '../../garbage-management-manager.model';
import { GarbageManagementManagerCardCommonController } from './common/garbage-management-manager-card-common.controller';

export abstract class GarbageManagementManagerCardAbstract
  implements IGarbageManagementManagerCard
{
  constructor(
    private common: GarbageManagementManagerCardCommonController,
    private tool: ComponentTool
  ) {
    this.html = this.init();
  }
  protected abstract ctors: Array<GarbageManagementManagerCardItem>;
  html: Promise<Array<IGarbageManagementManagerCardElement>>;

  private create(ctor: GarbageManagementManagerCardItem) {
    let component = this.tool.create(ctor.component, ctor.args);
    let element = this.tool.get.html(component);
    return element;
  }

  private init() {
    return new Promise<IGarbageManagementManagerCardElement[]>((resolve) => {
      wait(() => {
        return !!this.ctors && this.ctors.length > 0;
      })
        .then(() => {
          let elements = [];
          for (let i = 0; i < this.ctors.length; i++) {
            const ctor = this.ctors[i];
            let element: HTMLElement;
            if (ctor.single && ctor.selector) {
              if (this.common.elements.has(ctor.selector)) {
                element = this.common.elements.get(ctor.selector)!;
              } else {
                element = this.create(ctor);
                this.common.elements.set(ctor.selector, element);
              }
            } else {
              element = this.create(ctor);
            }

            elements.push({
              element: element,
              class: ctor.class,
            });
          }
          resolve(elements);
        })
        .catch(() => {
          console.warn('GarbageManagementManagerCardAbstract init wait error');
        });
    });
  }
}
