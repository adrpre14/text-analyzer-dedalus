import {Component, inject} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {TextAnalyzerService} from '../../services/text-analyzer.service';
import {TransformTextAnalysisCountPipe} from '../../pipes/transform-text-analysis-count.pipe';
import {NgClass, TitleCasePipe} from '@angular/common';
import {TextAnalyzerTypeEnum} from '../../enums/text-analyzer-type.enum';

@Component({
  selector: 'app-text-analyzer-history',
  imports: [
    MatCard,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    TransformTextAnalysisCountPipe,
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './text-analyzer-history.html',
  styleUrl: './text-analyzer-history.css'
})
export class TextAnalyzerHistory {
  public textAnalyzerService = inject(TextAnalyzerService);
  public readonly TextAnalyzerTypeEnum = TextAnalyzerTypeEnum;
}
