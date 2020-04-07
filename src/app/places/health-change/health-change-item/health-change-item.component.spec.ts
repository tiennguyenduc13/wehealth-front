import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthChangeItemComponent } from './health-change-item.component';

describe('HealthChangeItemComponent', () => {
  let component: HealthChangeItemComponent;
  let fixture: ComponentFixture<HealthChangeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HealthChangeItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthChangeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
