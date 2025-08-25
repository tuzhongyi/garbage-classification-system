import { Injectable } from '@angular/core';
import { GlobalStorageDivisionController } from './global-storage.service/global-division.storage';
import { GlobalStorageIntervalController } from './global-storage.service/global-interval.storage';
import { LocalStorageService } from './local.storage';

@Injectable({
  providedIn: 'root',
})
export class GlobalStorageService {
  system?: SystemType; // 垃圾清运

  password?: string;

  HideButton: boolean = false;
  HideTitlebar: boolean = false;

  division: GlobalStorageDivisionController;
  interval = new GlobalStorageIntervalController();


  constructor(private localStorage: LocalStorageService) {
    this.division = new GlobalStorageDivisionController(this.localStorage);
  }

  destroy() {
    this.system = undefined;
    this.password = undefined;
    this.division.clear();
    this.division = new GlobalStorageDivisionController(this.localStorage);
    this.interval.clear();
  }
}

export enum SystemType {
  aiop,
  garbage,
  vehicle,
}
