import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPage } from './org.page';

describe('OrgPage', () => {
  let component: OrgPage;
  let fixture: ComponentFixture<OrgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
