import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcasummaryComponent } from './ocasummary.component';

describe('OcasummaryComponent', () => {
  let component: OcasummaryComponent;
  let fixture: ComponentFixture<OcasummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcasummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcasummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
