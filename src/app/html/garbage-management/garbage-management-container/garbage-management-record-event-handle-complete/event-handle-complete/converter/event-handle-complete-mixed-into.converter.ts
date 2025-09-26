import { DrawPolygon } from '../../../../../../common/components/picture/picture-polygon-multiple/picture-polygon-multiple.model';
import { MixedIntoEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/mixed-into-event-record.model';
import {
  EventHandleCompleteModel,
  EventHandleCompleteModelType,
  EventRecordCompleteModel,
} from '../event-handle-complete.model';
import { EventHandleCompleteService } from '../service/event-handle-complete.service';
import { IConverter } from './event-handle-complete.converter';

export class EventHandleCompleteMixedIntoConverter
  implements IConverter<MixedIntoEventRecord>
{
  constructor(private service: EventHandleCompleteService) {}
  convert(input: MixedIntoEventRecord) {
    let model = new EventRecordCompleteModel();
    model.RecordNo = input.EventId;
    model.Record = input;
    model.GarbageStation = this.service.station.cache.get(input.Data.StationId);

    let items: EventHandleCompleteModel[] = [];

    let event = this.getEventItem(input);
    items = [...items, event];

    if (
      input.Data.IsHandle &&
      input.Data.HandleTime &&
      input.Data.HandleImageUrl &&
      input.ResourceId
    ) {
      let handle = this.getHandleItem(
        input,
        input.Data.HandleTime,
        input.Data.HandleImageUrl,
        input.ResourceId
      );
      items.push(handle);
    }

    items = items.sort((a, b) => {
      return a.Time.getTime() - b.Time.getTime();
    });
    model.Duration = {
      begin: input.EventTime,
      end: input.Data.HandleTime,
    };
    for (let i = 0; i < items.length; i++) {
      let first = i === 0;
      let last = i === items.length - 1;
      if (!first) {
        items[i].top = true;

        items[i].Minitues =
          (items[i].Time.getTime() - model.Duration.begin.getTime()) /
          (1000 * 60);
      }
      if (!last) {
        items[i].bottom = true;
      }
    }

    model.Items = items;

    return model;
  }

  getEventItem(data: MixedIntoEventRecord) {
    let item = new EventHandleCompleteModel();
    item.Time = data.EventTime;
    item.Type = EventHandleCompleteModelType.event;
    item.Title = '发现混合投放';
    item.TitleColor = '#3184e3';
    item.left = true;

    let polygon: DrawPolygon[] = [];
    if (data.Data.Objects) {
      polygon = data.Data.Objects.map((x) => {
        let polygon = new DrawPolygon(x.Polygon);
        polygon.color = 'red';
        return polygon;
      });
    }
    if (data.Data.Rules) {
      polygon = polygon.concat(
        data.Data.Rules.filter((x) => !!x.Polygon).map((x) => {
          let polygon = new DrawPolygon(x.Polygon!);
          polygon.color = 'blue';
          return polygon;
        })
      );
    }
    item.urls = [{ url: data.ImageUrl ?? '', polygon: polygon }];

    item.urls.forEach((x) => {
      if (x.polygon) {
        x.polygon.forEach((y) => {
          y.Confidence = undefined;
        });
      }
    });

    return item;
  }

  getHandleItem(
    data: MixedIntoEventRecord,
    time: Date,
    url: string,
    id: string
  ) {
    let item = new EventHandleCompleteModel();
    item.Type = EventHandleCompleteModelType.handle;
    item.Time = time;
    item.Title = '已消失';

    item.TitleColor = '#21e452';

    let polygon: DrawPolygon[] = [];
    if (data.Data.Objects) {
      polygon = data.Data.Objects.map((x) => {
        let polygon = new DrawPolygon(x.Polygon);
        polygon.color = 'red';
        return polygon;
      });
    }
    if (data.Data.Rules) {
      polygon = polygon.concat(
        data.Data.Rules.filter((x) => !!x.Polygon).map((x) => {
          let polygon = new DrawPolygon(x.Polygon!);
          polygon.color = 'blue';
          return polygon;
        })
      );
    }

    item.urls = [{ url: url, polygon: polygon }];

    item.urls.forEach((x) => {
      if (x.polygon) {
        x.polygon.forEach((y) => {
          y.Confidence = undefined;
        });
      }
    });
    item.left = false;
    item.top = true;
    return item;
  }
}
