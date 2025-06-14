import {inject, Injectable} from '@angular/core';
import {TextAnalyzerTypeEnum} from '../enums/text-analyzer-type.enum';
import {TextAnalysisResponseInterface} from '../interfaces/text-analysis-response.interface';
import {BaseApiService} from '../../../shared/services/base-api.service';
import {map} from 'rxjs';

@Injectable()
export class TextAnalyzerApi {
  private baseApiService = inject(BaseApiService);

  public analyzeText(type: TextAnalyzerTypeEnum, text: string) {
    return this.baseApiService.get<TextAnalysisResponseInterface>('/analyze', {
      type: TextAnalyzerTypeEnum[type],
      text
    }).pipe(
      map((result) => ({
        ...result,
        type: TextAnalyzerTypeEnum[result.type] as unknown as TextAnalyzerTypeEnum
      }))
    );
  }
}
