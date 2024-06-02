import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightToggleComponent } from './light-toggle.component';

describe('LightToggleComponent', () => {
  let component: LightToggleComponent;
  let fixture: ComponentFixture<LightToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LightToggleComponent]
    });
    fixture = TestBed.createComponent(LightToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
