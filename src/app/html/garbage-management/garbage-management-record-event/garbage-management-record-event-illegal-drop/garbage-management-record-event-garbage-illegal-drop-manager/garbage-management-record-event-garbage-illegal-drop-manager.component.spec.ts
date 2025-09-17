import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageIllegalDropManagerComponent } from './garbage-management-record-event-garbage-illegal-drop-manager.component';

describe('GarbageManagementRecordEventGarbageIllegalDropManagerComponent', () => {
  let component: GarbageManagementRecordEventGarbageIllegalDropManagerComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageIllegalDropManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageIllegalDropManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageIllegalDropManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
