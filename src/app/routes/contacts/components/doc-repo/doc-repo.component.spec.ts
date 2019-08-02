import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRepoComponent } from './doc-repo.component';

describe('DocRepoComponent', () => {
  let component: DocRepoComponent;
  let fixture: ComponentFixture<DocRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
