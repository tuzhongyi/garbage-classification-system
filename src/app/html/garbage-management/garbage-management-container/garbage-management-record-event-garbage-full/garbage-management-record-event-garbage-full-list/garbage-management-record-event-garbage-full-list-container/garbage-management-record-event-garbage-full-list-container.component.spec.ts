import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementRecordEventGarbageFullListContainerComponent } from './garbage-management-record-event-garbage-full-list-container.component';

describe('GarbageManagementRecordEventGarbageFullListContainerComponent', () => {
  let component: GarbageManagementRecordEventGarbageFullListContainerComponent;
  let fixture: ComponentFixture<GarbageManagementRecordEventGarbageFullListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementRecordEventGarbageFullListContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementRecordEventGarbageFullListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
