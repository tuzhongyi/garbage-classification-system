import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageFullStatisticDetailsContainerComponent } from './garbage-management-record-event-garbage-full-statistic-details-container.component';

describe('GarbageManagementRecordEventGarbageFullStatisticDetailsContainerComponent', () => {
  let component: GarbageManagementRecordEventGarbageFullStatisticDetailsContainerComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageFullStatisticDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageFullStatisticDetailsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageFullStatisticDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
