import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewEntryComponent } from './preview-entry.component';

describe('PreviewEntryComponent', () => {
  let component: PreviewEntryComponent;
  let fixture: ComponentFixture<PreviewEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
