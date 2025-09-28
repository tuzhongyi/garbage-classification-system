import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageDropDetailsManagerComponent } from './garbage-management-record-event-garbage-drop-details-manager.component';

describe('GarbageManagementRecordEventGarbageDropDetailsManagerComponent', () => {
  let component: GarbageManagementRecordEventGarbageDropDetailsManagerComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageDropDetailsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageDropDetailsManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageDropDetailsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
