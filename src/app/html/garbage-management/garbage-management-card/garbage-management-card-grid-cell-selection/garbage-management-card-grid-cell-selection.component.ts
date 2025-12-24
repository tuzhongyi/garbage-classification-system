import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IDivision } from '../../../../common/network/model/garbage-station/division.model';
import { GridCell } from '../../../../common/network/model/garbage-station/grid-cell.model';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';
import { GarbageManagementCardDivisionSelectionItemComponent } from '../garbage-management-card-division-selection/garbage-management-card-division-selection-item/garbage-management-card-division-selection-item.component';
import { GarbageManagementCardGridCellSelectionBusiness } from './garbage-management-card-grid-cell-selection.business';

@Component({
  selector: 'howell-garbage-management-card-grid-cell-selection',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementCardDivisionSelectionItemComponent,
  ],
  templateUrl: './garbage-management-card-grid-cell-selection.component.html',
  styleUrl: './garbage-management-card-grid-cell-selection.component.less',
  providers: [GarbageManagementCardGridCellSelectionBusiness],
})
export class GarbageManagementCardGridCellSelectionComponent
  implements OnInit, OnDestroy
{
  @Input() selected?: GridCell;
  @Output() selectedChange = new EventEmitter<GridCell>();
  @Input() select?: EventEmitter<GridCell>;

  constructor(
    private business: GarbageManagementCardGridCellSelectionBusiness
  ) {}

  root?: IDivision;
  datas: GridCell[] = [];

  private subscription = new Subscription();

  private regist() {
    if (this.select) {
      let sub = this.select.subscribe((x) => {
        this.selected = x;
        this.selectedChange.emit(this.selected);
      });
      this.subscription.add(sub);
    }
  }

  ngOnInit(): void {
    this.regist();
    this.load();
  }

  ngOnDestroy(): void {
    if (this.root) {
      this.business.division.select(this.root);
    }
    this.subscription.unsubscribe();
  }

  private load() {
    this.business.division.default().then((x) => {
      this.root = x;
      this.business.division.select(this.root);
    });
    this.business.load().then((x) => {
      this.datas = x;
    });
  }

  on = {
    select: (data: GridCell) => {
      if (data) {
        this.selected = data;
        this.selectedChange.emit(this.selected);
      }
    },
    root: () => {
      this.selected = undefined;
      this.selectedChange.emit(this.selected);
    },
  };
}
