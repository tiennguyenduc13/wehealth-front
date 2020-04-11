import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSocialPage } from './org-social.page';

describe('OrgSocialPage', () => {
  let component: OrgSocialPage;
  let fixture: ComponentFixture<OrgSocialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrgSocialPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgSocialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
