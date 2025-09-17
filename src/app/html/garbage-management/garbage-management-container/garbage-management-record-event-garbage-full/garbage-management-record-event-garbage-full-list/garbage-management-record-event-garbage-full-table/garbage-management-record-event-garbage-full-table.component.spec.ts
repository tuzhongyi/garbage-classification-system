import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageFullTableComponent } from './garbage-management-record-event-garbage-full-table.component';

describe('GarbageManagementRecordEventGarbageFullTableComponent', () => {
  let component: GarbageManagementRecordEventGarbageFullTableComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageFullTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageFullTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageFullTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
