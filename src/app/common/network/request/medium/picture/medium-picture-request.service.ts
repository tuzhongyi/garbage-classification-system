import { DataMediumUrl } from '../../../url/data/data-medium.url';
import { HowellBaseRequestService } from '../../base-request-howell.service';

export class MediumPictureRequestService {
  constructor(private basic: HowellBaseRequestService) {}

  get(id: string) {
    let url = DataMediumUrl.picture.item(id);
    return this.basic.http.get<string>(url);
  }
}
