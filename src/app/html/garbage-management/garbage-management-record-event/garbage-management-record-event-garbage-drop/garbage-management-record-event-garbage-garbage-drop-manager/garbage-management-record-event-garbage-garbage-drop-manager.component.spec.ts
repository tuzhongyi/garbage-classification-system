import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageGarbageDropManagerComponent } from './garbage-management-record-event-garbage-garbage-drop-manager.component';

describe('GarbageManagementRecordEventGarbageGarbageDropManagerComponent', () => {
  let component: GarbageManagementRecordEventGarbageGarbageDropManagerComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageGarbageDropManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageGarbageDropManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageGarbageDropManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
