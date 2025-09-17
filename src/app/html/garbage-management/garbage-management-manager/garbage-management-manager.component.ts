import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IDivision } from '../../../common/network/model/garbage-station/division.model';
import { GlobalStorageService } from '../../../common/storage/global.storage';
import { wait } from '../../../common/tools/tools';
import { GarbageManagementStationManagerComponent } from '../garbage-management-container/garbage-management-station/garbage-management-station-manager/garbage-management-station-manager.component';
import { GarbageManagementManagerController } from './controller/garbage-management-manager.controller';
import { GarbageManagementManagerImports } from './garbage-management-manager.import';
import { GarbageManagementManagerProviders } from './garbage-management-manager.provider';
import { GarbageManagementManagerWindow } from './window/garbage-management-manager.window';

// GarbageManagementMapComponent,
@Component({
  selector: 'howell-garbage-management-manager',
  templateUrl: './garbage-management-manager.component.html',
  styleUrl: './garbage-management-manager.component.less',
  imports: [
    ...GarbageManagementManagerImports,
    GarbageManagementStationManagerComponent,
  ],
  providers: [...GarbageManagementManagerProviders],
})
export class GarbageManagementManagerComponent implements OnInit, OnDestroy {
  get card() {
    return this.controller.card;
  }
  get navigation() {
    return this.controller.navigation;
  }
  get data() {
    return this.controller.data;
  }
  get statistic() {
    return this.controller.statistic;
  }

  constructor(
    public window: GarbageManagementManagerWindow,
    private controller: GarbageManagementManagerController,

    private global: GlobalStorageService
  ) {}

  private destroyed = false;
  private element = {
    left: undefined as ElementRef<HTMLElement> | undefined,
    right: undefined as ElementRef<HTMLElement> | undefined,
  };
  private get left() {
    return this.element.left;
  }
  @ViewChild('container_left')
  private set left(value: ElementRef<HTMLElement> | undefined) {
    this.element.left = value;
    if (value) {
      this.load.left(value.nativeElement);
    }
  }
  private get right() {
    return this.element.right;
  }
  @ViewChild('container_right')
  private set right(value: ElementRef<HTMLElement> | undefined) {
    this.element.right = value;
    if (value) {
      this.load.right(value.nativeElement);
    }
  }
  private regist() {
    this.global.division.change.subscribe((x) => {
      this.card.load.event.emit();
      this.map.select.emit(x);
    });
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
    wait(
      () => {
        this.card.load.event.emit();
        return this.destroyed;
      },
      () => {},
      60 * 1000
    );
  }

  ngOnInit(): void {
    this.regist();
    this.controller.navigation.home();
    this.data.load();
  }
  ngOnDestroy(): void {
    this.destroyed = true;
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

  map = {
    select: new EventEmitter<IDivision>(),
    load: new EventEmitter<void>(),
  };
}
