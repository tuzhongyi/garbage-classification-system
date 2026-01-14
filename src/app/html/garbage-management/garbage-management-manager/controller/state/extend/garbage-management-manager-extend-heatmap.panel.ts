import { GeoTool } from '../../../../../../common/tools/geo-tool/geo.tool';
import { GarbageManagementManagerComponent } from '../../../garbage-management-manager.component';
import { GarbageManagementManagerIasHeatmapArgs } from '../../../garbage-management-manager.model';

export class GarbageManagementManagerExtendHeatmapState {
  show = false;
  args = new GarbageManagementManagerIasHeatmapArgs();
  textable = true;
  constructor(private that: GarbageManagementManagerComponent) {}

  on = {
    change: (args: GarbageManagementManagerIasHeatmapArgs) => {
      this.that.business.ias.heatmap(args).then((datas) => {
        let positions = datas
          .filter((x) => !!x.Location)
          .map((x) => {
            let location = x.Location!;
            return GeoTool.point.convert.wgs84.to.gcj02(
              location.Longitude,
              location.Latitude
            );
          });

        this.that.data.heatmap = positions;
      });
    },
    init: () => {
      this.on.change(this.args);
    },
    open: () => {
      this.that.state.extend.control.show = false;
      this.that.state.statistic.show = false;
      this.that.state.display.ias.record.show = false;
      this.on.change(this.args);
    },
    close: () => {
      this.show = false;
      this.that.state.extend.control.show = true;
      this.that.state.statistic.show = true;
      this.that.state.display.ias.record.show = true;
      this.that.data.heatmap = [];
    },
  };
}
