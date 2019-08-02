import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoLogComponent } from './convo-log.component';

describe('ConvoLogComponent', () => {
  let component: ConvoLogComponent;
  let fixture: ComponentFixture<ConvoLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvoLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvoLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
