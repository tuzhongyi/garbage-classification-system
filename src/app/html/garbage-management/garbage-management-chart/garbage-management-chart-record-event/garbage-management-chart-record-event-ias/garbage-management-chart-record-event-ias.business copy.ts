// import { Injectable } from '@angular/core';
// import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
// import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
// import { GetIasEventsParams } from '../../../../../common/network/request/ias/event/ias-event-request.params';
// import { IasRequestService } from '../../../../../common/network/request/ias/ias-request.service';
// import { ArrayTool } from '../../../../../common/tools/array-tool/array.tool';
// import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
// import { IGarbageManagementChartRecordEventSource } from '../garbage-management-chart-record-event.model';

// @Injectable()
// export class GarbageManagementChartRecordEventIasBusiness {
//   constructor(private service: IasRequestService) {}

//   async load(unit: TimeUnit, date: Date, deviceId?: string) {
//     let datas: IasEventRecord[] = [];

//     datas = await this.data(unit, date, deviceId);

//     let models = this.convert(unit, date, datas);
//     return models;
//   }

//   private convert(unit: TimeUnit, date: Date, datas: IasEventRecord[]) {
//     let duration = DateTimeTool.TimeUnit(unit, date);
//     let group = ArrayTool.groupBy(datas, (x) => {
//       return this.get.unit(unit, x.EventTime);
//     });
//     let items: IGarbageManagementChartSource[] = [];

//     let begin = this.get.unit(unit, duration.begin);
//     let end = this.get.unit(unit, duration.end) + 1;
//     if (DateTimeTool.is.unit(date, unit)) {
//       end = this.get.unit(unit, new Date()) + 1;
//     }

//     for (let i = begin; i < end; i++) {
//       let time = new Date();
//       this.set.unit(unit, time, i);
//       let item: IGarbageManagementChartSource = {
//         time: time,
//         value: 0,
//       };
//       if (group[i]) {
//         item.value = group[i].length;
//       }
//       items.push(item);
//     }
//     return items;
//   }

//   private async data(unit: TimeUnit, date: Date, deviceId?: string) {
//     let duration = DateTimeTool.TimeUnit(unit, date);
//     let params = new GetIasEventsParams();
//     params.BeginTime = duration.begin;
//     params.EndTime = duration.end;
//     params.EventType = 103;
//     if (deviceId) {
//       params.Ids = [deviceId];
//     }

//     return this.service.event.cache.all(params);
//   }

//   get = {
//     unit: (unit: TimeUnit, date: Date) => {
//       switch (unit) {
//         case TimeUnit.Day:
//           return date.getHours();
//         case TimeUnit.Year:
//           return date.getMonth() + 1;
//         case TimeUnit.Week:
//           let day = date.getDay();
//           if (day === 0) {
//             day = 7;
//           }
//           return day;
//         case TimeUnit.Month:
//         default:
//           return date.getDate();
//       }
//     },
//   };
//   set = {
//     unit: (unit: TimeUnit, date: Date, index: number) => {
//       switch (unit) {
//         case TimeUnit.Day:
//           date.setHours(index, 0, 0, 0);
//           break;
//         case TimeUnit.Year:
//           date.setMonth(index - 1, 1);
//           date.setHours(0, 0, 0, 0);
//           break;
//         case TimeUnit.Week:
//           let day = date.getDay();
//           let diff = index - day;
//           date.setDate(date.getDate() + diff);
//           date.setHours(0, 0, 0, 0);
//           break;
//         case TimeUnit.Month:
//         default:
//           date.setDate(index);
//           date.setHours(0, 0, 0, 0);
//           break;
//       }
//     },
//   };
// }
