import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageManagementCardDivisionSelectionComponent } from './garbage-management-card-division-selection.component';

describe('GarbageManagementCardDivisionSelectionComponent', () => {
  let component: GarbageManagementCardDivisionSelectionComponent;
  let fixture: ComponentFixture<GarbageManagementCardDivisionSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarbageManagementCardDivisionSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarbageManagementCardDivisionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
