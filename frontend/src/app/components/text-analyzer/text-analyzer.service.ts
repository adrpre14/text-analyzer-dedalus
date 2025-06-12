import {inject, Injectable} from '@angular/core';
import {TextAnalyzerApi} from './api/text-analyzer.api';
import {TextAnalyzerTypeEnum} from '../../enums/text-analyzer-type.enum';
import {TextAnalysisResponseInterface} from '../../interfaces/text-analysis-response.interface';
import {Observable, of} from 'rxjs';

@Injectable()
export class TextAnalyzerService {
  private textAnalyzerApi = inject(TextAnalyzerApi);

  public analyzeText(
    type: TextAnalyzerTypeEnum,
    text: string,
    onlineMode: boolean
  ): Observable<TextAnalysisResponseInterface> {
    if (onlineMode) return this.textAnalyzerApi.analyzeText(type, text);
    return of(this.analyzeTextOffline(type, text));
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

    const sortedEntries = Array.from(charMap.entries()).sort((a, b) => b[1] - a[1]);
    return {
      counts: Object.fromEntries(sortedEntries)
    }
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
