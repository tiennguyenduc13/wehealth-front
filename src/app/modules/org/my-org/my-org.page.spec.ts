import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrgPage } from './my-org.page';

describe('MyOrgPage', () => {
  let component: MyOrgPage;
  let fixture: ComponentFixture<MyOrgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyOrgPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
