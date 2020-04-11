import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgItemComponent } from './org-item.component';

describe('OrgItemComponent', () => {
  let component: OrgItemComponent;
  let fixture: ComponentFixture<OrgItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
