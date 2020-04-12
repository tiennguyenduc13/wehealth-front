import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxPage } from './mailbox.page';

describe('MailboxPage', () => {
  let component: MailboxPage;
  let fixture: ComponentFixture<MailboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MailboxPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
