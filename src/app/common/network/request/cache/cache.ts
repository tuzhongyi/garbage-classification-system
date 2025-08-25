import { ClassConstructor } from 'class-transformer';
import { DivisionNumberStatistic } from '../../model/garbage-station/division-number-statistic.model';
import { Division } from '../../model/garbage-station/division.model';
import { GarbageStationNumberStatistic } from '../../model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from '../../model/garbage-station/garbage-station.model';
import { DivisionServiceCache } from './division-service.cache';
import { DivisionStatisticServiceCache } from './division-statistic-service.cache';
import { GarbageStationServiceCache } from './garbage-station-service.cache';
import { GarbageStationStatisticServiceCache } from './garbage-station-statistic-service.cache';
import { ServiceCache } from './service.cache';

export function Cache<T>(key: string, type?: ClassConstructor<T>) {
  return function (this: any, target: Function) {
    if (!target.prototype.cache) {
      // new ServiceCache(key, this);
      // console.log('Cache', this);
      Object.defineProperty(target.prototype, 'cache', {
        get() {
          if (!this._cache) {
            if (type) {
              switch (type.name) {
                case Division.name:
                  this._cache = new DivisionServiceCache(key, this);
                  break;
                case GarbageStation.name:
                  this._cache = new GarbageStationServiceCache(key, this);
                  break;
                case DivisionNumberStatistic.name:
                  this._cache = new DivisionStatisticServiceCache(key, this);
                  break;
                case GarbageStationNumberStatistic.name:
                  this._cache = new GarbageStationStatisticServiceCache(
                    key,
                    this
                  );
                  break;
                default:
                  this._cache = new ServiceCache(key, this);
                  break;
              }
            } else {
              this._cache = new ServiceCache(key, this);
            }
          }
          return this._cache;
        },
        set() {},
      });
      // target.prototype.cache = function () {
      //   console.log('cache', this);
      //   return;
      // };
    }
  };
}
