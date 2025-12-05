import { formatDate } from '@angular/common';
import { IasEventRecord } from '../../../../../../../common/network/model/ias/ias-event-record.model';
import { Language } from '../../../../../../../common/tools/language';
import { GarbageManagementMapAMapRecordInfoContentAbstract } from './garbage-management-map-amap-record-info-content.abstract';

export class GarbageManagementMapAMapRecordExposedInfoContentController extends GarbageManagementMapAMapRecordInfoContentAbstract<IasEventRecord> {
  load(data: IasEventRecord) {
    let content = ``;
    content += this.title(data);
    content += this.address(data);
    content += this.time(data);
    return content;
  }

  private time(data: IasEventRecord) {
    let icon = 'mdi mdi-clock';
    let value = formatDate(data.EventTime, Language.yyyyMMddHHmmss, 'en');
    return this.item(icon, value);
  }
  private address(data: IasEventRecord) {
    let icon = 'howell-icon-map4';
    let value = data.Address ?? '无';
    return this.item(icon, value);
  }

  private title(data: IasEventRecord) {
    let title = Language.EventType(data.EventType);
    return `<div class="${this.classname.title}">${title}</div>`;
  }

  private type(data: IasEventRecord) {
    let icon = 'mdi mdi-view-dashboard';
    let value = Language.EventType(data.EventType);
    return this.item(icon, value);
  }
}
