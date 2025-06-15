import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TextAnalyzerForm } from './text-analyzer-form';
import { TextAnalyzerService } from '../../services/text-analyzer.service';
import { TextAnalyzerTypeEnum } from '../../enums/text-analyzer-type.enum';
import SpyObj = jasmine.SpyObj;

describe('TextAnalyzerForm', () => {
  let component: TextAnalyzerForm;
  let fixture: ComponentFixture<TextAnalyzerForm>;
  let mockTextAnalyzerService: SpyObj<TextAnalyzerService>;

  beforeEach(async () => {
    mockTextAnalyzerService = jasmine.createSpyObj('TextAnalyzerService', ['analyzeText', 'addToHistory']);
    await TestBed.configureTestingModule({
      imports: [TextAnalyzerForm],
      providers: [
        { provide: TextAnalyzerService, useValue: mockTextAnalyzerService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAnalyzerForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct typeOfAnalysisOptions', () => {
    expect(component.typeOfAnalysisOptions).toEqual([
      { key: 'CONSONANTS', value: TextAnalyzerTypeEnum.CONSONANTS },
      { key: 'VOWELS', value: TextAnalyzerTypeEnum.VOWELS }
    ]);
  });

  it('should not call analyzeText when input is empty', () => {
    component.inputControl.setValue('');
    component.analyze();
    expect(mockTextAnalyzerService.analyzeText).not.toHaveBeenCalled();
  });

  it('should call analyzeText and addToHistory in offline mode', () => {
    const result = { id: '1', fullText: 'abc', type: TextAnalyzerTypeEnum.VOWELS, counts: {} };
    mockTextAnalyzerService.analyzeText.and.returnValue(of(result));
    component.inputControl.setValue('abc');
    component.textAnalyzerModeControl.setValue(false);
    component.typeOfAnalysisControl.setValue(TextAnalyzerTypeEnum.VOWELS);
    component.analyze();
    expect(mockTextAnalyzerService.analyzeText).toHaveBeenCalledWith(TextAnalyzerTypeEnum.VOWELS, 'abc', false);
    expect(mockTextAnalyzerService.addToHistory).toHaveBeenCalledWith(result);
  });

  it('should call analyzeText with online mode true', () => {
    const result = { id: '2', fullText: 'xyz', type: TextAnalyzerTypeEnum.CONSONANTS, counts: {} };
    mockTextAnalyzerService.analyzeText.and.returnValue(of(result));
    component.inputControl.setValue('xyz');
    component.textAnalyzerModeControl.setValue(true);
    component.typeOfAnalysisControl.setValue(TextAnalyzerTypeEnum.CONSONANTS);
    component.analyze();
    expect(mockTextAnalyzerService.analyzeText).toHaveBeenCalledWith(TextAnalyzerTypeEnum.CONSONANTS, 'xyz', true);
    expect(mockTextAnalyzerService.addToHistory).toHaveBeenCalledWith(result);
  });
});
