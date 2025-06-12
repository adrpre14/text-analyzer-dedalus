import {Component, inject} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {TextAnalyzerService} from '../../services/text-analyzer.service';
import {TransformTextAnalysisCountPipe} from '../../pipes/transform-text-analysis-count.pipe';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-text-analyzer-history',
  imports: [
    MatCard,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    TransformTextAnalysisCountPipe,
    NgClass
  ],
  templateUrl: './text-analyzer-history.html',
  styleUrl: './text-analyzer-history.css'
})
export class TextAnalyzerHistory {
  public textAnalyzerService = inject(TextAnalyzerService);
}
