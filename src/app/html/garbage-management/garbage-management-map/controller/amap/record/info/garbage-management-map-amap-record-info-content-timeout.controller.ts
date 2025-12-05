import { formatDate } from '@angular/common';
import { IasEventRecord } from '../../../../../../../common/network/model/ias/ias-event-record.model';
import { Language } from '../../../../../../../common/tools/language';
import { GarbageManagementMapAMapRecordInfoContentAbstract } from './garbage-management-map-amap-record-info-content.abstract';

export class GarbageManagementMapAMapRecordTimeoutInfoContentController extends GarbageManagementMapAMapRecordInfoContentAbstract<IasEventRecord> {
  load(data: IasEventRecord) {
    let content = ``;
    content += this.title();
    content += this.type(data);
    content += this.address(data);
    content += this.time(data);
    content += this.hr();
    content += this.timeout(data);
    return content;
  }

  private title() {
    let title = '高频事件';
    return `<div class="${this.classname.title}">${title}</div>`;
  }

  private type(data: IasEventRecord) {
    let icon = 'mdi mdi-view-dashboard';
    let value = Language.EventType(data.EventType);
    return this.item(icon, value);
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

  private timeout(data: IasEventRecord) {
    return `
    <div class="${this.classname.basic}-timeout">
      <div class="${this.classname.basic}-timeout-name">最近重复次数</div>
      <div class="${this.classname.basic}-timeout-value">
        <div class="${this.classname.basic}-timeout-value-number">
          ${data.PeriodRepeatTimes ?? 0}
        </div>
        <div class="${this.classname.basic}-timeout-value-unit">次</div>
      </div>
    </div>`;
  }

  hr() {
    return `<div class="hr"></div>`;
  }
}
