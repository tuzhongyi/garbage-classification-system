import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { SelectDirective } from '../../../../common/components/select/hw-select/select.directive';
import { StationType } from '../../../../common/enum/station-type.enum';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { wait } from '../../../../common/tools/wait.tools';
import { SelectGarbageStationBusiness } from '../select-garbage-station/select-garbage-station.business';
import { SelectSearchComponent } from '../select-search/select-search.component';

@Component({
  selector: 'howell-select-search-garbage-station',
  imports: [CommonModule, SelectSearchComponent],
  templateUrl: './select-garbage-station-search.component.html',
  styleUrl: './select-garbage-station-search.component.less',
  providers: [SelectGarbageStationBusiness],
})
export class SelectSearchGarbageStationComponent implements OnInit, OnChanges {
  @Input() default = false;
  @Input() delay = false;
  @Input() clearable = false;
  @Input() selected?: GarbageStation;
  @Output() selectedChange = new EventEmitter<GarbageStation>();
  @Input() selectedId?: string;
  @Output() selectedIdChange = new EventEmitter<string>();
  @Input() divisionId?: string;
  @Input() types: StationType[] = [];
  @Output() element = new EventEmitter<SelectDirective>();

  constructor(private business: SelectGarbageStationBusiness) {}

  datas: GarbageStation[] = [];
  loaded = false;

  private load(divisionId?: string, types: StationType[] = []) {
    this.loaded = false;
    this.business
      .load(divisionId, types)
      .then((x) => {
        this.datas = x;
        if (this.selected) {
          this.selected = this.datas.find((x) => x.Id === this.selected?.Id);
          this.on.change();
        } else if (this.selectedId) {
          this.selected = this.datas.find((x) => x.Id === this.selectedId);
          this.selectedChange.emit(this.selected);
        } else {
          if (this.default && this.datas.length > 0) {
            this.selected = this.datas[0];
            this.on.change();
          }
        }
      })
      .finally(() => {
        this.loaded = true;
      });
  }
  private change = {
    selectedId: (simple: SimpleChange) => {
      if (simple) {
        wait(() => {
          return this.loaded;
        })
          .then(() => {
            if (this.selectedId) {
              this.selected = this.datas.find((x) => x.Id === this.selectedId);
            } else {
              this.selected = undefined;
            }
            if (!this.selected) {
              if (this.default) {
                this.selected = this.datas[0];
                this.on.change();
              }
            }
            this.selectedChange.emit(this.selected);
          })
          .catch(() => {
            console.warn(
              'SelectSearchGarbageStationComponent change.selectedId wait timeout'
            );
          });
      }
    },
    divisionId: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.divisionId, this.types);
      }
    },
    types: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.divisionId, this.types);
      }
    },
  };

  ngOnInit(): void {
    if (this.delay == false) {
      this.load(this.divisionId, this.types);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.divisionId(changes['divisionId']);
    this.change.types(changes['types']);
    this.change.selectedId(changes['selectedId']);
  }

  on = {
    change: () => {
      this.selectedChange.emit(this.selected);

      this.selectedId = this.selected?.Id;
      this.selectedIdChange.emit(this.selectedId);
    },
    element: (e: SelectDirective) => {
      this.element.emit(e);
    },
  };
}
