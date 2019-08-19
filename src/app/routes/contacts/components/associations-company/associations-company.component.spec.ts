import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsCompanyComponent } from './associations-company.component';

describe('AssociationsCompanyComponent', () => {
  let component: AssociationsCompanyComponent;
  let fixture: ComponentFixture<AssociationsCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationsCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
