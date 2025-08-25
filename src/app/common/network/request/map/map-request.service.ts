import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { MapDivision } from './map-division.model';
import { MapPoint } from './map-point.model';

@Injectable({
  providedIn: 'root',
})
export class MapRequestService {
  constructor(private http: HttpClient) {}

  division = {
    array: async (id: string) => {
      let url = `/amap/amap_node/upload.js?type=village&id=${id}`;
      let response = await firstValueFrom(this.http.get<MapDivision[]>(url));
      return plainToInstance(MapDivision, response);
    },
    points: async (divisionId: string) => {
      let url = `/amap/amap_node/upload.js?type=point&id=${divisionId}`;
      let response = await firstValueFrom(this.http.get<MapPoint[]>(url));
      return plainToInstance(MapPoint, response);
    },
  };
}
