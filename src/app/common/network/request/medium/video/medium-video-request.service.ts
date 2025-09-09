import { DataMediumUrl } from '../../../url/data/data-medium.url';
import { HowellBaseRequestService } from '../../base-request-howell.service';

export class MediumVideoRequestService {
  constructor(private basic: HowellBaseRequestService) {}

  get(id: string) {
    let url = DataMediumUrl.video.item(id);
    return this.basic.http.get<BinaryData>(url);
  }
}
