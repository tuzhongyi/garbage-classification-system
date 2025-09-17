import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageMixedIntoManagerComponent } from './garbage-management-record-event-garbage-mixed-into-manager.component';

describe('GarbageManagementRecordEventGarbageMixedIntoManagerComponent', () => {
  let component: GarbageManagementRecordEventGarbageMixedIntoManagerComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageMixedIntoManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageMixedIntoManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageMixedIntoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
