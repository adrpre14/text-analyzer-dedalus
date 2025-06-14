import {inject, Injectable, Signal, signal} from '@angular/core';
import {TextAnalyzerApi} from './text-analyzer.api';
import {TextAnalyzerTypeEnum} from '../enums/text-analyzer-type.enum';
import {TextAnalysisResponseInterface} from '../interfaces/text-analysis-response.interface';
import {Observable, of} from 'rxjs';
import {sortTextAnalysis} from '../utils/sort-text-analysis.util';

@Injectable()
export class TextAnalyzerService {
  private textAnalyzerApi = inject(TextAnalyzerApi);
  private analysisHistory = signal<TextAnalysisResponseInterface[]>([]);

  public get getAnalysisHistory(): Signal<TextAnalysisResponseInterface[]> {
    return this.analysisHistory.asReadonly();
  }

  public get lastResult(): TextAnalysisResponseInterface {
    return this.analysisHistory()[0];
  }

  public analyzeText(
    type: TextAnalyzerTypeEnum,
    text: string,
    onlineMode: boolean
  ): Observable<TextAnalysisResponseInterface> {
    if (onlineMode) return this.textAnalyzerApi.analyzeText(type, text);
    return of(this.analyzeTextOffline(type, text));
  }

  public addToHistory(analysis: TextAnalysisResponseInterface): void {
    this.analysisHistory.update(history => [analysis, ...history]);
  }

  private analyzeTextOffline(type: TextAnalyzerTypeEnum, text: string): TextAnalysisResponseInterface {
    const formattedText = this.formatText(text, type);

    const charMap = new Map<string, number>();
    for (const char of formattedText) {
      if (charMap.has(char)) {
        charMap.set(char, charMap.get(char)! + 1);
      } else {
        charMap.set(char, 1);
      }
    }

    const sortedEntries = Array.from(charMap.entries()).sort(sortTextAnalysis);
    return {
      id: crypto.randomUUID(),
      fullText: text,
      type,
      counts: Object.fromEntries(sortedEntries)
    };
  }

  private formatText(text: string, type: TextAnalyzerTypeEnum): string {
    let formattedText = text.replaceAll(/[^a-zA-Z]/g, '').toLowerCase();

    if (type === TextAnalyzerTypeEnum.Vowels)
      formattedText = formattedText.replaceAll(/[^aeiouAEIOU]/g, '');
    else if (type === TextAnalyzerTypeEnum.Consonants)
      formattedText = formattedText.replaceAll(/[aeiouAEIOU]/g, '');

    return formattedText;
  }
}
