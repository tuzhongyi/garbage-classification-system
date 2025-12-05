import { formatDate } from '@angular/common';
import { WindowViewModel } from '../../../../common/components/window/window.model';
import { IasEventRecord } from '../../../../common/network/model/ias/ias-event-record.model';
import { Language } from '../../../../common/tools/language';
import { SizeTool } from '../../../../common/tools/size-tool/size.tool';

export class GarbageManagementManagerMapWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
  };
  title = '地图位置';
  data?: IasEventRecord;
  clear() {
    this.data = undefined;
  }
  open(data: IasEventRecord) {
    this.title = `${data.Address ?? '地图位置'} ${formatDate(
      data.EventTime,
      Language.yyyyMMddHHmmss,
      'en'
    )}`;
    this.data = data;
    this.show = true;
  }
}
