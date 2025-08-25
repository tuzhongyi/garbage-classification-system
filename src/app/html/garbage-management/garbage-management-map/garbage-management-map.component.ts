import { Component, OnInit } from '@angular/core';
import { GarbageManagementMapBusiness } from './business/garbage-management-map.business';
import { GarbageManagementMapController } from './controller/garbage-management-map.controller';
import { GarbageManagementMapProviders } from './garbage-management-map.provider';

@Component({
  selector: 'howell-garbage-management-map',
  imports: [],
  templateUrl: './garbage-management-map.component.html',
  styleUrl: './garbage-management-map.component.less',
  providers: [...GarbageManagementMapProviders],
})
export class GarbageManagementMapComponent implements OnInit {
  constructor(
    public controller: GarbageManagementMapController,
    private business: GarbageManagementMapBusiness
  ) {}
  ngOnInit(): void {
    this.load.division();
    this.load.station();
  }

  load = {
    division: () => {
      this.business.map.current().then((x) => {
        if (x) {
          this.controller.load.root(x);
          this.controller.move([x.center.lon, x.center.lat]);
        }
      });

      this.business.map.children().then((datas) => {
        if (datas) {
          this.controller.load.division(datas);
        }
      });
    },
    station: () => {
      this.business.station.load().then((datas) => {
        this.controller.load.station(datas);
      });
    },
  };
}
