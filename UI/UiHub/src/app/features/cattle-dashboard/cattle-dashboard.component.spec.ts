import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleDashboardComponent } from './cattle-dashboard.component';

describe('CattleDashboardComponent', () => {
  let component: CattleDashboardComponent;
  let fixture: ComponentFixture<CattleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CattleDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CattleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
