import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewHealthChangePage } from "./new-health-change.page";

describe("NewHealthChangePage", () => {
  let component: NewHealthChangePage;
  let fixture: ComponentFixture<NewHealthChangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewHealthChangePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHealthChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
