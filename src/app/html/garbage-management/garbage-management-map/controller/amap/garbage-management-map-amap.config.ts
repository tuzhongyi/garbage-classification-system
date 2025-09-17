import { EventEmitter } from '@angular/core';

export class GarbageManagementMapAMapConfig {
  static event = {
    mousemoving: new EventEmitter<[number, number]>(),
  };

  static height = 0;

  static zoom = {
    point: [0, 18] as [number, number],
    marker: [18, 24] as [number, number],
  };

  static color = {
    border: {
      root: 'rgba(0, 246, 255,0.1)',
      division: 'rgba(0,246,255, 0.8)',
    },
  };
}
