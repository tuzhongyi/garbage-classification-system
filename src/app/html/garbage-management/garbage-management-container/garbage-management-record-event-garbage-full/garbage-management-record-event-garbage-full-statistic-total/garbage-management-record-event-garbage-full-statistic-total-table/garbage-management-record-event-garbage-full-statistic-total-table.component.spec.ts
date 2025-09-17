import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageFullStatisticTotalTableComponent } from './garbage-management-record-event-garbage-full-statistic-total-table.component';

describe('GarbageManagementRecordEventGarbageFullStatisticTotalTableComponent', () => {
  let component: GarbageManagementRecordEventGarbageFullStatisticTotalTableComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageFullStatisticTotalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageFullStatisticTotalTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageFullStatisticTotalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
