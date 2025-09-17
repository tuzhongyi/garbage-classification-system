import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDivision } from '../../../../../common/network/model/garbage-station/division.model';
import { GarbageManagementCardComponent } from '../../component/garbage-management-card.component';
import { GarbageManagementCardDivisionSelectionItemComponent } from '../garbage-management-card-division-selection-item/garbage-management-card-division-selection-item.component';
import { GarbageManagementCardDivisionSelectionBusiness } from './garbage-management-card-division-selection.business';

@Component({
  selector: 'app-garbage-management-card-division-selection',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementCardDivisionSelectionItemComponent,
  ],
  templateUrl: './garbage-management-card-division-selection.component.html',
  styleUrl: './garbage-management-card-division-selection.component.less',
  providers: [GarbageManagementCardDivisionSelectionBusiness],
})
export class GarbageManagementCardDivisionSelectionComponent implements OnInit {
  constructor(
    private business: GarbageManagementCardDivisionSelectionBusiness
  ) {}

  root?: IDivision;
  datas: IDivision[] = [];
  selected?: IDivision;

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.business.default().then((x) => {
      this.root = x;
    });
    this.business.selected().then((x) => {
      this.selected = x;
    });
    this.business.change.subscribe((x) => {
      this.selected = x;
    });
    this.business.load().then((x) => {
      this.datas = x;
    });
  }

  on = {
    select: (data?: IDivision) => {
      if (data) {
        this.selected = data;
        this.business.select(this.selected);
      }
    },
  };
}
