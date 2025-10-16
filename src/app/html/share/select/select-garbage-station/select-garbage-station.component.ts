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
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { StationType } from '../../../../common/enum/station-type.enum';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { SelectGarbageStationBusiness } from './select-garbage-station.business';

@Component({
  selector: 'howell-garbage-station-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-garbage-station.component.html',
  styleUrl: './select-garbage-station.component.less',
  providers: [SelectGarbageStationBusiness],
})
export class SelectGarbageStationComponent implements OnInit, OnChanges {
  @Input() default = false;
  @Input() selected?: GarbageStation;
  @Output() selectedChange = new EventEmitter<GarbageStation>();
  @Input() selectedId?: string;
  @Output() selectedIdChange = new EventEmitter<string>();
  @Input() divisionId?: string;
  @Input() types: StationType[] = [];

  constructor(private business: SelectGarbageStationBusiness) {}

  datas: GarbageStation[] = [];

  private load(divisionId?: string, types: StationType[] = []) {
    this.business.load(divisionId, types).then((x) => {
      this.datas = x;
      if (this.default && this.datas.length > 0) {
        this.selected = this.datas[0];
        this.on.change();
      }
    });
  }
  private change = {
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
    this.load(this.divisionId, this.types);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.divisionId(changes['divisionId']);
    this.change.types(changes['types']);
  }

  on = {
    change: () => {
      this.selectedChange.emit(this.selected);

      this.selectedId = this.selected?.Id;
      this.selectedIdChange.emit(this.selectedId);
    },
  };
}
