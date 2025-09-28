import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageDropDetailsContainerComponent } from './garbage-management-record-event-garbage-drop-details-container.component';

describe('GarbageManagementRecordEventGarbageDropDetailsContainerComponent', () => {
  let component: GarbageManagementRecordEventGarbageDropDetailsContainerComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageDropDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageDropDetailsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageDropDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
