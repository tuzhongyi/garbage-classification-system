import { DataMediumUrl } from '../../../url/data/data-medium.url';
import { HowellBaseRequestService } from '../../base-request-howell.service';

export class MediumAudioRequestService {
  constructor(private basic: HowellBaseRequestService) {}
  get(id: string) {
    let url = DataMediumUrl.audio.item(id);
    return this.basic.http.get<BinaryData>(url);
  }
  url(id: string) {
    return DataMediumUrl.audio.item(id);
  }
}
