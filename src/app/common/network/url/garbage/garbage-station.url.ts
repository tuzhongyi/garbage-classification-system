import { BaseUrl } from '../base.url';
import { AbnormalInnerUrl } from './inner/abnormals.url';
import { CameraInnerUrl } from './inner/camera.url';
import { DeviceInnerUrl } from './inner/device.url';
import { EventNumberInnerUrl } from './inner/event_number.url';
import { MemberInnerUrl } from './inner/member.url';
import { NBBoxeInnerUrl } from './inner/nb-box.url';
import { StatisticInnerUrl } from './inner/statistic.url';
import { TaskInnerUrl } from './inner/task.url';
import { TrashCanInnerUrl } from './inner/trash_can.url';
import { TypeInnerUrl } from './inner/type.url';
import { VolumeInnerUrl } from './inner/volume.url';

export class GarbageStationUrl {
  static basic() {
    return `${BaseUrl.garbage.garbage_management}/GarbageStations`;
  }
  static item(id: string) {
    return `${GarbageStationUrl.basic()}/${id}`;
  }
  static list() {
    return `${GarbageStationUrl.basic()}/List`;
  }
  static excels() {
    return `${GarbageStationUrl.basic()}/Excels`;
  }
  static manualcapture(id: string) {
    return `${GarbageStationUrl.item(id)}/ManualCapture`;
  }

  static camera(id?: string) {
    const base = id ? GarbageStationUrl.item(id) : GarbageStationUrl.basic();
    return new CameraInnerUrl(base);
  }
  static trashcan(id?: string) {
    const base = id ? GarbageStationUrl.item(id) : GarbageStationUrl.basic();
    return new TrashCanInnerUrl(base);
  }
  static statistic(id?: string) {
    const base = id ? GarbageStationUrl.item(id) : GarbageStationUrl.basic();
    return new StatisticInnerUrl(base);
  }
  static eventnumber(id?: string) {
    const base = id ? GarbageStationUrl.item(id) : this.basic();
    return new EventNumberInnerUrl(base);
  }

  static type = new TypeInnerUrl(GarbageStationUrl.basic());

  static member(id: string) {
    return new MemberInnerUrl(GarbageStationUrl.item(id));
  }
  static task(id: string) {
    return new TaskInnerUrl(GarbageStationUrl.item(id));
  }
  static volume(id: string) {
    return new VolumeInnerUrl(GarbageStationUrl.item(id));
  }

  static device(id: string) {
    return new DeviceInnerUrl(GarbageStationUrl.item(id));
  }
  static nb = {
    box: (id: string) => {
      return new NBBoxeInnerUrl(GarbageStationUrl.item(id));
    },
  };

  static abnormal() {
    return new AbnormalInnerUrl(this.basic());
  }
}
