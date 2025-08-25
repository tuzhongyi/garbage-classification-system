import { Injectable } from '@angular/core';
import { UserConfigType } from '../../../common/enum/user-config-type.enum';
import { User } from '../../../common/network/model/garbage-station/user.model';
import { UserRequestService } from '../../../common/network/request/user/user-request.service';
import { LocalStorageService } from '../../../common/storage/local.storage';

@Injectable()
export class LoginConfigController {
  constructor(
    private service: UserRequestService,
    private local: LocalStorageService
  ) {}
  load(user: User) {
    this.video(user);
  }

  private video(user: User) {
    this.service.config.get(user.Id, UserConfigType.VideoStream).then((x) => {
      if (x) {
        this.local.video.stream = parseInt(x);
      }
    });
    this.service.config
      .get(user.Id, UserConfigType.VideoRuleState)
      .then((x) => {
        this.local.video.rule = JSON.parse(x);
      });
  }
}
