import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrgsPage } from './my-orgs.page';

describe('MyOrgsPage', () => {
  let component: MyOrgsPage;
  let fixture: ComponentFixture<MyOrgsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyOrgsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrgsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
