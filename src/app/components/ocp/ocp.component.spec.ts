import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcpComponent } from './ocp.component';

describe('OcpComponent', () => {
  let component: OcpComponent;
  let fixture: ComponentFixture<OcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
