import { WindowViewModel } from '../../../../common/components/window/window.model';
import { Page } from '../../../../common/network/model/page_list.model';
import { SizeTool } from '../../../../common/tools/size-tool/size.tool';

export class GarbageManagementManagerPictureWindow extends WindowViewModel {
  style = {
    ...SizeTool.window.large,
    zIndex: '100',
  };
  title = '';

  args?: {
    id: string;
  };
  page?: Page;

  on = {
    page: {
      change: (page: Page) => {},
    },
  };
}
