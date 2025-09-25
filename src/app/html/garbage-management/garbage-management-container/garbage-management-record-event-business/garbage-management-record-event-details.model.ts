import { EventNumber } from '../../../../common/network/model/garbage-station/event-number.model';

export class EventNumberStatisticModel {
  Id?: string;
  Time!: Date;
  EventNumbers?: EventNumber[];
}
