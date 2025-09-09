import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentTool } from '../../../common/tools/component-tool/component.tool';
import { ObjectTool } from '../../../common/tools/object-tool/object.tool';
import { GarbageManagementCardComponent } from '../garbage-management-card/component/garbage-management-card.component';

@Component({
  selector: 'app-garbage-management-manager-settings',
  imports: [CommonModule, GarbageManagementCardComponent],
  templateUrl: './garbage-management-manager-settings.component.html',
  styleUrl: './garbage-management-manager-settings.component.less',
  providers: [],
})
export class GarbageManagementManagerSettingsComponent implements OnInit {
  constructor(private tool: ComponentTool) {}
  ctors = ObjectTool.factory.register();

  @ViewChild('container')
  set container(value: ElementRef<HTMLElement>) {
    if (value) {
      let items = value.nativeElement.querySelectorAll('.card-item');
      this.element.list(items);
    }
  }

  ngOnInit(): void {}

  element = {
    datas: new Map<string, HTMLElement>(),
    list: (containers: NodeListOf<Element>) => {
      this.element.datas.clear();
      for (let i = 0; i < containers.length; i++) {
        let container = containers.item(i);
        let ctor = this.ctors[i];
        let element = this.element.append(container, ctor);
        this.element.datas.set(ctor.name, element);
      }
    },
    append: (container: Element, ctor: any) => {
      let component = this.tool.create(ctor);
      let element = this.tool.get.html(component);
      container.appendChild(element);
      return element;
    },
    get: (ctor: any) => {
      let name = ctor.name;
      if (this.element.datas.has(name)) {
        return this.element.datas.get(name);
      }
      return undefined;
    },
  };

  on = {
    dragging: undefined as HTMLElement | undefined,
    drag: (element?: HTMLElement) => {
      this.on.dragging = element;
    },
    drop: () => {
      console.log(this.on.dragging);
    },
  };
}
