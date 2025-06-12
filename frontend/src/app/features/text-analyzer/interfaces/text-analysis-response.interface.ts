import {TextAnalyzerTypeEnum} from '../enums/text-analyzer-type.enum';

export type TextAnalysisCounts = { [char: string]: number };

export interface TextAnalysisResponseInterface {
  id?: string;
  fullText: string;
  type: TextAnalyzerTypeEnum;
  counts: TextAnalysisCounts;
}
