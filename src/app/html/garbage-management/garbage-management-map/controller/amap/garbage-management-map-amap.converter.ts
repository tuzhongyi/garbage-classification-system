import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
import { MapDivision } from '../../../../../common/network/request/map/map-division.model';
import { GarbageStationViewModel } from '../../../../../common/view-model/garbage-station.view-model';

export class GarbageManagementMapAMapConverter {
  constructor() {}

  static geo = {
    line: {
      item: (data: MapDivision) => {
        let geo: any = {
          type: 'Feature',
          properties: data,
          geometry: {
            type: 'LineString',
            coordinates: [...data.areas],
          },
        };
        return geo;
      },
      array: (datas: MapDivision[]) => {
        let geo: any = {
          type: 'FeatureCollection',
          features: datas.map((x) => this.geo.line.item(x)),
        };
        return geo;
      },
    },

    polygon: {
      item: (data: MapDivision) => {
        let geo: any = {
          type: 'Feature',
          properties: data,
          geometry: {
            type: 'Polygon',
            coordinates: [data.areas],
          },
        };
        return geo;
      },
      array: (datas: MapDivision[]) => {
        let geo: any = {
          type: 'FeatureCollection',
          features: datas.map((x) => {
            return this.geo.polygon.item(x);
          }),
        };
        return geo;
      },
    },
    point: {
      item: (data: GarbageStationViewModel | IasEventRecord) => {
        let point = this.position.load(data);
        let geo = {
          type: 'Feature',
          properties: data,
          geometry: {
            type: 'Point',
            coordinates: point,
          },
        };
        return geo;
      },
      array: (datas: (GarbageStationViewModel | IasEventRecord)[]) => {
        let geo: any = {
          type: 'FeatureCollection',
          features: datas.map((x) => {
            return this.geo.point.item(x);
          }),
        };
        return geo;
      },
    },
  };

  private static position = {
    load: (data: GarbageStationViewModel | IasEventRecord) => {
      if (data instanceof GarbageStationViewModel) {
        return this.position.from.station(data);
      }
      if (data instanceof IasEventRecord) {
        return this.position.from.ias(data);
      }
      throw new Error('Data type error');
    },
    from: {
      station: (data: GarbageStationViewModel) => {
        let point = data.GisPoint!;
        return [point.Longitude, point.Latitude] as [number, number];
      },
      ias: (data: IasEventRecord) => {
        let point = data.Location!;
        return [point.Longitude, point.Latitude] as [number, number];
      },
    },
  };
}
