import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleDetailsComponent } from './cattle-details.component';

describe('CattleDetailsComponent', () => {
  let component: CattleDetailsComponent;
  let fixture: ComponentFixture<CattleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CattleDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CattleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
