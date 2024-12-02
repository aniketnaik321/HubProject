import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleTransactionComponent } from './cattle-transaction.component';

describe('CattleTransactionComponent', () => {
  let component: CattleTransactionComponent;
  let fixture: ComponentFixture<CattleTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CattleTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CattleTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
