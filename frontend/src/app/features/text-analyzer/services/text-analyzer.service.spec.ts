import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TextAnalyzerService } from './text-analyzer.service';
import { TextAnalyzerApi } from './text-analyzer.api';
import { TextAnalyzerTypeEnum } from '../enums/text-analyzer-type.enum';

describe('TextAnalyzerService', () => {
  let service: TextAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TextAnalyzerService,
        { provide: TextAnalyzerApi, useValue: { analyzeText: () => of(null) } }
      ]
    });
    service = TestBed.inject(TextAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should analyze vowels offline correctly', (done) => {
    service.analyzeText(TextAnalyzerTypeEnum.VOWELS, 'Hello, World!', false).subscribe(res => {
      expect(res.fullText).toBe('Hello, World!');
      expect(res.type).toBe(TextAnalyzerTypeEnum.VOWELS);
      expect(Object.keys(res.counts)).toEqual(['o', 'e']);
      expect(Object.values(res.counts)).toEqual([2, 1]);
      done();
    });
  });

  it('should analyze consonants offline correctly', (done) => {
    service.analyzeText(TextAnalyzerTypeEnum.CONSONANTS, 'Hello, World!', false).subscribe(res => {
      expect(res.fullText).toBe('Hello, World!');
      expect(res.type).toBe(TextAnalyzerTypeEnum.CONSONANTS);
      expect(Object.keys(res.counts)).toEqual(['l', 'd', 'h', 'r', 'w']);
      expect(Object.values(res.counts)).toEqual([3, 1, 1, 1, 1]);
      done();
    });
  });

  it('should return empty counts for empty text', (done) => {
    service.analyzeText(TextAnalyzerTypeEnum.VOWELS, '', false).subscribe(res => {
      expect(res.fullText).toBe('');
      expect(Object.keys(res.counts)).toEqual([]);
      done();
    });
  });

  it('should call API when online mode is true', () => {
    const apiSpy = spyOn(TestBed.inject(TextAnalyzerApi), 'analyzeText').and.callThrough();
    service.analyzeText(TextAnalyzerTypeEnum.VOWELS, 'Test', true).subscribe();
    expect(apiSpy).toHaveBeenCalledWith(TextAnalyzerTypeEnum.VOWELS, 'Test');
  });
});
