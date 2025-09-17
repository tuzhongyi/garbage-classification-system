import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageFullStatisticTotalManagerComponent } from './garbage-management-record-event-garbage-full-statistic-total-manager.component';

describe('GarbageManagementRecordEventGarbageFullStatisticTotalManagerComponent', () => {
  let component: GarbageManagementRecordEventGarbageFullStatisticTotalManagerComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageFullStatisticTotalManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageFullStatisticTotalManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageFullStatisticTotalManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
