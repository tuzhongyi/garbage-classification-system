import { Injectable } from '@angular/core';
import { DivisionRequestService } from '../../../../../../../common/network/request/garbage/division/division-request.service';
import { IasRequestService } from '../../../../../../../common/network/request/ias/ias-request.service';
import { GarbageManagementChartPieRecordStatisticContainerDivisionService } from './garbage-management-chart-pie-record-statistic-container-division.service';
import { GarbageManagementChartPieRecordStatisticContainerIasService } from './garbage-management-chart-pie-record-statistic-container-ias.service';

@Injectable()
export class GarbageManagementChartPieRecordStatisticContainerService {
  ias: GarbageManagementChartPieRecordStatisticContainerIasService;
  division: GarbageManagementChartPieRecordStatisticContainerDivisionService;
  constructor(ias: IasRequestService, division: DivisionRequestService) {
    this.ias = new GarbageManagementChartPieRecordStatisticContainerIasService(
      ias
    );
    this.division =
      new GarbageManagementChartPieRecordStatisticContainerDivisionService(
        division
      );
  }
}
