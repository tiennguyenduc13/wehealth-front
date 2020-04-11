import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinOrgPage } from './other-orgs.page';

describe('JoinOrgPage', () => {
  let component: JoinOrgPage;
  let fixture: ComponentFixture<JoinOrgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JoinOrgPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinOrgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
