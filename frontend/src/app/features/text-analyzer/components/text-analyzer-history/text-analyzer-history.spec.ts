import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnalyzerHistory } from './text-analyzer-history';
import { TextAnalyzerService } from '../../services/text-analyzer.service';
import { TextAnalyzerTypeEnum } from '../../enums/text-analyzer-type.enum';

describe('TextAnalyzerHistory', () => {
  let component: TextAnalyzerHistory;
  let fixture: ComponentFixture<TextAnalyzerHistory>;
  let mockTextAnalyzerService: { history: any[]; getAnalysisHistory: () => any[] };

  beforeEach(async () => {
    mockTextAnalyzerService = { history: [], getAnalysisHistory: () => mockTextAnalyzerService.history };
    await TestBed.configureTestingModule({
      imports: [TextAnalyzerHistory],
      providers: [
        { provide: TextAnalyzerService, useValue: mockTextAnalyzerService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAnalyzerHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no history message when history is empty', () => {
    mockTextAnalyzerService.history = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('No analysis history available.');
  });

  it('should display expansion panels for each history entry', () => {
    mockTextAnalyzerService.history = [
      { id: '1', fullText: 'abc', type: TextAnalyzerTypeEnum.CONSONANTS, counts: { a: 1, b: 2 } },
      { id: '2', fullText: 'xyz', type: TextAnalyzerTypeEnum.VOWELS, counts: { x: 3 } }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const panels = compiled.querySelectorAll('mat-expansion-panel');
    expect(panels.length).toBe(2);

    const title = panels[0].querySelector('mat-panel-title')?.textContent;
    const desc = panels[0].querySelector('mat-panel-description')?.textContent;
    expect(title).toContain('Sentence: abc');
    expect(desc).toContain('Type of analysis: Consonants');

    const paragraphs = panels[0].querySelectorAll('p');
    expect(Array.from(paragraphs).map(p => p.textContent)).toEqual([
      'The letter b appears 2 times.',
      'The letter a appears 1 time.'
    ]);
  });
});
