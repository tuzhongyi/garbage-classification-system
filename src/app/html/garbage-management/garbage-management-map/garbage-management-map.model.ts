import { EventEmitter } from '@angular/core';

export interface IMapIcon<T> {
  normal: T;
  hover?: T;
  selected?: T;
  error?: T;
}
export class MapPointEvent<T> {
  mouseover = new EventEmitter<T>();
  mouseout = new EventEmitter<T>();
  click = new EventEmitter<T>();
  dblclick = new EventEmitter<T>();
}
