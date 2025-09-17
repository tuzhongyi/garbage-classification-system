import { Injectable } from '@angular/core';
import { MediumRequestService } from '../../../network/model/medium/medium-request.service';

@Injectable()
export class PictureBusiness {
  constructor(private medium: MediumRequestService) {}

  load(id: string) {
    return this.medium.get(id);
  }
}
