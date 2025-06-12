import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TextAnalyzerTypeEnum} from '../../../enums/text-analyzer-type.enum';
import {TextAnalysisResponseInterface} from '../../../interfaces/text-analysis-response.interface';

@Injectable()
export class TextAnalyzerApi {
  private httpClient = inject(HttpClient);

  public analyzeText(type: TextAnalyzerTypeEnum, text: string) {
    const url = `/api/analyze-text`;
    const body = {
      type,
      text
    };

    return this.httpClient.post<TextAnalysisResponseInterface>(url, body, { responseType: 'json' });
  }
}
