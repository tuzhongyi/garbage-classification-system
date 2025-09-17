import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageFullStatisticDetailsManagerComponent } from './garbage-management-record-event-garbage-full-statistic-details-manager.component';

describe('GarbageManagementRecordEventGarbageFullStatisticDetailsManagerComponent', () => {
  let component: GarbageManagementRecordEventGarbageFullStatisticDetailsManagerComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageFullStatisticDetailsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageFullStatisticDetailsManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageFullStatisticDetailsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
