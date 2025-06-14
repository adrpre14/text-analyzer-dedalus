import {Component} from '@angular/core';
import {TextAnalyzerService} from './services/text-analyzer.service';
import {TextAnalyzerApi} from './services/text-analyzer.api';
import {TextAnalyzerHistory} from './components/text-analyzer-history/text-analyzer-history';
import {TextAnalyzerForm} from './components/text-analyzer-form/text-analyzer-form';

@Component({
  selector: 'app-text-analyzer',
  imports: [
    TextAnalyzerHistory,
    TextAnalyzerForm
  ],
  providers: [TextAnalyzerService, TextAnalyzerApi],
  templateUrl: './text-analyzer.html',
  styleUrl: './text-analyzer.css'
})
export class TextAnalyzer {

}
