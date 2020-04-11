import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrgPage } from './new-org.page';

describe('NewOrgPage', () => {
  let component: NewOrgPage;
  let fixture: ComponentFixture<NewOrgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewOrgPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
