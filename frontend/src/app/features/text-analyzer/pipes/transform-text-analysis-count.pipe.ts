import {Pipe, PipeTransform} from '@angular/core';
import {TextAnalysisCounts} from '../interfaces/text-analysis-response.interface';
import {sortTextAnalysis} from '../utils/sort-text-analysis.util';

@Pipe({
  name: 'transformTextAnalysisCount',
  standalone: true
})
export class TransformTextAnalysisCountPipe implements PipeTransform {
  transform(value: TextAnalysisCounts): string[] {
    if (!value || typeof value !== 'object') return [];

    const sortedEntries = Object.entries(value).sort(sortTextAnalysis);
    return sortedEntries.map(([char, count]) => `The letter ${char} appears ${count} time${count > 1 ? 's' : ''}.`);
  }
}
