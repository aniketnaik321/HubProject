import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleMasterComponent } from './cattle-master.component';

describe('CattleMasterComponent', () => {
  let component: CattleMasterComponent;
  let fixture: ComponentFixture<CattleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CattleMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CattleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
