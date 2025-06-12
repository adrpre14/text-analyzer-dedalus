import { TestBed } from '@angular/core/testing';

import { TextAnalyzerApi } from './text-analyzer.api';

describe('TextAnalyzerApi', () => {
  let service: TextAnalyzerApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextAnalyzerApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
