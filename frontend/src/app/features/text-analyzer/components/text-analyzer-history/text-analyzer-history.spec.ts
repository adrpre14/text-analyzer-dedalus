import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnalyzerHistory } from './text-analyzer-history';

describe('TextAnalyzerHistory', () => {
  let component: TextAnalyzerHistory;
  let fixture: ComponentFixture<TextAnalyzerHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAnalyzerHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAnalyzerHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
