import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementCardCalendarComponent } from './garbage-management-card-calendar.component';

describe('GarbageManagementCardCalendarComponent', () => {
  let component: GarbageManagementCardCalendarComponent;
  let fixture: ComponentFixture<GarbageManagementCardCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementCardCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementCardCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
