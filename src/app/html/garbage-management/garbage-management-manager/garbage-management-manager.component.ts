import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { wait } from '../../../common/tools/tools';
import { GarbageManagementManagerController } from './controller/garbage-management-manager.controller';
import { GarbageManagementManagerImports } from './garbage-management-manager.import';
import { GarbageManagementManagerProviders } from './garbage-management-manager.provider';
import { GarbageManagementManagerWindow } from './window/garbage-management-manager.window';

// GarbageManagementMapComponent,
@Component({
  selector: 'howell-garbage-management-manager',
  templateUrl: './garbage-management-manager.component.html',
  styleUrl: './garbage-management-manager.component.less',
  imports: [...GarbageManagementManagerImports],
  providers: [...GarbageManagementManagerProviders],
})
export class GarbageManagementManagerComponent implements OnInit {
  constructor(private controller: GarbageManagementManagerController) {}

  window = new GarbageManagementManagerWindow();
  get card() {
    return this.controller.card;
  }
  get navigation() {
    return this.controller.navigation;
  }
  get data() {
    return this.controller.data;
  }

  private element = {
    left: undefined as ElementRef<HTMLElement> | undefined,
    right: undefined as ElementRef<HTMLElement> | undefined,
  };
  get left() {
    return this.element.left;
  }
  @ViewChild('container_left')
  set left(value: ElementRef<HTMLElement> | undefined) {
    this.element.left = value;
    if (value) {
      this.load.left(value.nativeElement);
    }
  }
  get right() {
    return this.element.right;
  }
  @ViewChild('container_right')
  set right(value: ElementRef<HTMLElement> | undefined) {
    this.element.right = value;
    if (value) {
      this.load.right(value.nativeElement);
    }
  }

  ngOnInit(): void {
    this.controller.navigation.change.subscribe((x) => {
      this.card.on.index(x);
      if (this.left) {
        this.load.left(this.left.nativeElement);
      }
      if (this.right) {
        this.load.right(this.right.nativeElement);
      }
      this.data.on.index(x);
    });
    this.controller.navigation.home();
    this.data.load();
  }

  load = {
    left: (element: HTMLElement) => {
      let items = element.querySelectorAll(
        '.garbage-management-manager-card-item'
      );
      wait(
        () => {
          items = element.querySelectorAll(
            '.garbage-management-manager-card-item'
          );
          return items.length > 0;
        },
        () => {
          this.controller.card.load.left(items);
        }
      );
    },
    right: (element: HTMLElement) => {
      let items = element.querySelectorAll(
        '.garbage-management-manager-card-item'
      );
      wait(
        () => {
          items = element.querySelectorAll(
            '.garbage-management-manager-card-item'
          );
          return items.length > 0;
        },
        () => {
          this.controller.card.load.right(items);
        }
      );
    },
  };
}
