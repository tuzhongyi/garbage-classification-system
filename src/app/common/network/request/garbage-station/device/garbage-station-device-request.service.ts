import { instanceToPlain } from 'class-transformer';
import { DeviceCommand } from '../../../model/garbage-station/device-command.model';
import { GarbageDeviceData } from '../../../model/garbage-station/garbage-device-data.model';
import { GarbageStationUrl } from '../../../url/garbage/garbage-station.url';
import { HowellBaseRequestService } from '../../base-request-howell.service';

export class GarbageStationDeviceRequestService {
  constructor(private basic: HowellBaseRequestService) {}

  command(stationId: string, command: DeviceCommand): Promise<DeviceCommand> {
    let url = GarbageStationUrl.device(stationId).command();
    let plain = instanceToPlain(command);
    return this.basic.post(url, DeviceCommand, plain);
  }
  status(stationId: string): Promise<GarbageDeviceData> {
    let url = GarbageStationUrl.device(stationId).status();
    return this.basic.get(url, GarbageDeviceData);
  }
}
