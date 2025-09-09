import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { EventInfo } from '../../../model/garbage-station/event-info.model';
import { PagedList } from '../../../model/page_list.model';
import { EventUrl } from '../../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { GetEventInfosParams } from './event-request.params';
import { EventRecordGarbageDropRequestService } from './garbage-drop/event-request-garbage-drop.service';
import { EventRecordGarbageFullRequestService } from './garbage-full/event-request-garbage-full.service';
import { EventRecordIllegalDropRequestService } from './illegal-drop/event-request-illegal-drop.service';
import { EventRecordIllegalVehicleRequestService } from './illegal-vehicle/event-request-illegal-vehicle.service';
import { EventRecordMixedIntoRequestService } from './mixed-info/event-request-mixed-info.service';
import { EventRecordSewageRequestService } from './sewage/event-request-sewage.service';

@Injectable({
  providedIn: 'root',
})
export class EventRequestService {
  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
  }

  private basic: HowellBaseRequestService;

  private _info?: InfosService;
  public get info(): InfosService {
    if (!this._info) {
      this._info = new InfosService(this.basic);
    }
    return this._info;
  }

  private _record?: RecordsService;
  public get record(): RecordsService {
    if (!this._record) {
      this._record = new RecordsService(this.basic);
    }
    return this._record;
  }
}

class InfosService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(EventInfo);
  }

  type: HowellBaseTypeRequestService<EventInfo>;

  list(params: GetEventInfosParams): Promise<PagedList<EventInfo>> {
    let url = EventUrl.info.list();
    let data = instanceToPlain(params);
    return this.type.paged(url, data);
  }
  get(type: number): Promise<EventInfo> {
    let url = EventUrl.info.item(type);
    return this.type.get(url);
  }
  update(data: EventInfo): Promise<EventInfo> {
    let url = EventUrl.info.item(data.Type);
    return this.type.put(url, data);
  }
}

class RecordsService {
  constructor(private basic: HowellBaseRequestService) {}

  private _IllegalDrop?: EventRecordIllegalDropRequestService;
  public get IllegalDrop(): EventRecordIllegalDropRequestService {
    if (!this._IllegalDrop) {
      this._IllegalDrop = new EventRecordIllegalDropRequestService(this.basic);
    }
    return this._IllegalDrop;
  }

  private _MixedInto?: EventRecordMixedIntoRequestService;
  public get MixedInto(): EventRecordMixedIntoRequestService {
    if (!this._MixedInto) {
      this._MixedInto = new EventRecordMixedIntoRequestService(this.basic);
    }
    return this._MixedInto;
  }

  private _GarbageFull?: EventRecordGarbageFullRequestService;
  public get GarbageFull(): EventRecordGarbageFullRequestService {
    if (!this._GarbageFull) {
      this._GarbageFull = new EventRecordGarbageFullRequestService(this.basic);
    }
    return this._GarbageFull;
  }

  private _GarbageDrop?: EventRecordGarbageDropRequestService;
  public get GarbageDrop(): EventRecordGarbageDropRequestService {
    if (!this._GarbageDrop) {
      this._GarbageDrop = new EventRecordGarbageDropRequestService(this.basic);
    }
    return this._GarbageDrop;
  }

  private _sewage?: EventRecordSewageRequestService;
  public get sewage(): EventRecordSewageRequestService {
    if (!this._sewage) {
      this._sewage = new EventRecordSewageRequestService(this.basic);
    }
    return this._sewage;
  }

  private _IllegalVehicle?: EventRecordIllegalVehicleRequestService;
  public get IllegalVehicle(): EventRecordIllegalVehicleRequestService {
    if (!this._IllegalVehicle) {
      this._IllegalVehicle = new EventRecordIllegalVehicleRequestService(
        this.basic
      );
    }
    return this._IllegalVehicle;
  }
}
