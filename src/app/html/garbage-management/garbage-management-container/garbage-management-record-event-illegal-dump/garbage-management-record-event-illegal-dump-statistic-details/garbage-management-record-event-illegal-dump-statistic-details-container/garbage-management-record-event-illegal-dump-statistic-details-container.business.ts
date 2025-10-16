import { Injectable } from '@angular/core';
import { EventType } from '../../../../../../common/enum/event-type.enum';
import { TimeUnit } from '../../../../../../common/enum/time-unit.enum';
import { UserResourceType } from '../../../../../../common/enum/user-resource-type.enum';
import { Duration } from '../../../../../../common/network/model/garbage-station/duration.model';
import { GlobalStorageService } from '../../../../../../common/storage/global.storage';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { LocaleCompare } from '../../../../../../common/tools/locale-compare';
import { ITimeData } from '../../../../garbage-management-chart/garbage-management-chart-line/garbage-management-chart-line.model';
import { GarbageManagementRecordEventDetailsDivisionBusiness } from '../../../garbage-management-record-event-business/garbage-management-record-event-details-division.business';
import { GarbageManagementRecordEventDetailsStationBusiness } from '../../../garbage-management-record-event-business/garbage-management-record-event-details-station.business';
import { GarbageManagementRecordEventDetailsConverter } from '../../../garbage-management-record-event-business/garbage-management-record-event-details.converter';
import { EventNumberStatisticModel } from '../../../garbage-management-record-event-business/garbage-management-record-event-details.model';
import { StatisticType } from '../../../garbage-management-station/garbage-management-station-statistic-details/garbage-management-station-statistic-details.model';
import { GarbageManagementRecordEventIllegalDumpStatisticDetailsArgs } from './garbage-management-record-event-illegal-dump-statistic-details-container.model';

@Injectable()
export class GarbageManagementRecordEventIllegalDumpStatisticDetailsContainerBusiness {
  constructor(
    private store: GlobalStorageService,
    private station: GarbageManagementRecordEventDetailsStationBusiness,
    public division: GarbageManagementRecordEventDetailsDivisionBusiness,
    private converter: GarbageManagementRecordEventDetailsConverter
  ) {}

  async load(
    args: GarbageManagementRecordEventIllegalDumpStatisticDetailsArgs
  ): Promise<ITimeData<number>[][]> {
    let division = await this.store.division.selected;
    let duration = DateTimeTool.TimeUnit(args.unit, args.date);
    let divisionId = division.Id;
    let type = args.stationId
      ? UserResourceType.Station
      : UserResourceType.None;
    let id = args.stationId ?? args.divisionId ?? divisionId;

    let data = await this.getData(id, type, duration, args.unit);
    switch (args.unit) {
      case TimeUnit.Hour:
        data = data.sort((a, b) => {
          return LocaleCompare.compare(a.Time.getHours(), b.Time.getHours());
        });
        break;
      case TimeUnit.Week:
        data = data.sort((a, b) => {
          let _a = a.Time.getDay();
          if (_a == 0) {
            _a = 7;
          }
          let _b = b.Time.getDay();
          if (_b == 0) {
            _b = 7;
          }
          return LocaleCompare.compare(_a, _b);
        });
        break;
      case TimeUnit.Month:
        data = data.sort((a, b) => {
          return LocaleCompare.compare(a.Time.getDate(), b.Time.getDate());
        });
        break;
      case TimeUnit.Year:
        data = data.sort((a, b) => {
          return LocaleCompare.compare(a.Time.getMonth(), b.Time.getMonth());
        });
        break;

      default:
        break;
    }
    let model = this.converter.Convert(
      data,
      [EventType.IllegalDrop2],
      args.unit
    );
    return model;
  }
  async getData(
    id: string,
    type: UserResourceType,
    interval: Duration,
    unit: TimeUnit
  ): Promise<EventNumberStatisticModel[]> {
    switch (type) {
      case UserResourceType.Station:
        if (unit === TimeUnit.Year) {
          return this.station.year(id, interval);
        } else {
          return this.station.history(id, interval, unit);
        }

      default:
        if (unit === TimeUnit.Year) {
          return this.division.year(id, interval);
        } else {
          return this.division.history(id, interval, unit);
        }
    }
  }

  getFilter(eventType: EventType) {
    switch (eventType) {
      case EventType.MixedInto:
        return StatisticType.mixedInto;
      case EventType.IllegalDrop:
      default:
        return StatisticType.illegalDrop;
    }
  }
}
