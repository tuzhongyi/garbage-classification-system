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
      item: (data: GarbageStationViewModel) => {
        let point = data.GisPoint!;
        let geo = {
          type: 'Feature',
          properties: data,
          geometry: {
            type: 'Point',
            coordinates: [point.Longitude, point.Latitude],
          },
        };
        return geo;
      },
      array: (datas: GarbageStationViewModel[]) => {
        let geo: any = {
          type: 'FeatureCollection',
          features: datas
            .filter((x) => !!x.GisPoint)
            .map((x) => {
              return this.geo.point.item(x);
            }),
        };
        return geo;
      },
    },
  };
}
