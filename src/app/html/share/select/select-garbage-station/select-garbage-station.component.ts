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
import { NgForOf } from '../../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr';
import { GarbageStation } from '../../../../common/network/model/garbage-station/garbage-station.model';
import { SelectGarbageStationBusiness } from './select-garbage-station.business';

@Component({
  selector: 'howell-garbage-station-select',
  imports: [FormsModule, NgForOf],
  templateUrl: './select-garbage-station.component.html',
  styleUrl: './select-garbage-station.component.less',
  providers: [SelectGarbageStationBusiness],
})
export class SelectGarbageStationComponent implements OnInit, OnChanges {
  @Input() selected?: GarbageStation;
  @Output() selectedChange = new EventEmitter<GarbageStation>();
  @Input() selectedId?: string;
  @Output() selectedIdChange = new EventEmitter<string>();
  @Input() divisionId?: string;

  constructor(private business: SelectGarbageStationBusiness) {}

  datas: GarbageStation[] = [];

  private load(divisionId?: string) {
    this.business.load(divisionId).then((x) => {
      this.datas = x;
    });
  }
  private change = {
    divisionId: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.divisionId);
      }
    },
  };

  ngOnInit(): void {
    this.load(this.divisionId);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.divisionId(changes['divisionId']);
  }

  on = {
    change: () => {
      this.selectedChange.emit(this.selected);

      this.selectedId = this.selected?.Id;
      this.selectedIdChange.emit(this.selectedId);
    },
  };
}
