import {Component, inject} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {KeyValuePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TransformTextAnalysisCountPipe} from '../../pipes/transform-text-analysis-count.pipe';
import {TextAnalyzerTypeEnum} from '../../enums/text-analyzer-type.enum';
import {TextAnalyzerService} from '../../services/text-analyzer.service';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-text-analyzer-form',
  imports: [
      CdkTextareaAutosize,
      KeyValuePipe,
      MatButton,
      MatCard,
      MatDivider,
      MatFormField,
      MatHint,
      MatInput,
      MatLabel,
      MatOption,
      MatSelect,
      MatSlideToggle,
      ReactiveFormsModule,
      TransformTextAnalysisCountPipe
  ],
  templateUrl: './text-analyzer-form.html',
  styleUrl: './text-analyzer-form.css'
})
export class TextAnalyzerForm {
  inputControl = new FormControl('');
  textAnalyzerModeControl = new FormControl(false);
  typeOfAnalysis: TextAnalyzerTypeEnum = TextAnalyzerTypeEnum.Consonants;

  textAnalyzerService = inject(TextAnalyzerService);
  public readonly TextAnalyzerTypeEnum = TextAnalyzerTypeEnum;

  analyze() {
    const onlineMode = !!this.textAnalyzerModeControl.value;
    const inputText = this.inputControl.value || '';
    if (!inputText) {
      return;
    }

    this.textAnalyzerService.analyzeText(this.typeOfAnalysis, inputText, onlineMode).subscribe((result) => {
      this.textAnalyzerService.addToHistory(result);
    });
  }
}
