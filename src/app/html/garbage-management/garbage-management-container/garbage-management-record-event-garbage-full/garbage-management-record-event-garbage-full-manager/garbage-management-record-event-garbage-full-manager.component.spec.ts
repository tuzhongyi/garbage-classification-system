import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageFullManagerComponent } from './garbage-management-record-event-garbage-full-manager.component';

describe('GarbageManagementRecordEventGarbageFullManagerComponent', () => {
  let component: GarbageManagementRecordEventGarbageFullManagerComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageFullManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageFullManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageFullManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
