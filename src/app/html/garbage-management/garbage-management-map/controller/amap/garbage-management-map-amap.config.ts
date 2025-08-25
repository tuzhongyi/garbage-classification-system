import { EventEmitter } from '@angular/core';

export class GarbageManagementMapAMapConfigController {
  static event = {
    mousemoving: new EventEmitter<[number, number]>(),
  };

  static height = 15;
  static color = {
    border: {
      root: 'rgba(0,246,255, 0.3)',
      division: 'rgba(0,246,255, 0.8)',
    },
  };
}
