import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatFormField, MatHint, MatInput} from '@angular/material/input';
import {MatCard} from '@angular/material/card';
import {TextAnalyzerService} from './text-analyzer.service';
import {TextAnalyzerTypeEnum} from '../../enums/text-analyzer-type.enum';
import {HttpClient} from '@angular/common/http';
import {TextAnalyzerApi} from './api/text-analyzer.api';

@Component({
  selector: 'app-text-analyzer',
  imports: [
    MatButton,
    MatSlideToggle,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    MatInput,
    MatFormField,
    MatCard,
    MatHint
  ],
  providers: [TextAnalyzerService, TextAnalyzerApi],
  templateUrl: './text-analyzer.html',
  styleUrl: './text-analyzer.css'
})
export class TextAnalyzer {
  inputControl = new FormControl('');
  textAnalyzerModeControl = new FormControl(false);

  textAnalyzerService = inject(TextAnalyzerService);

  analyze() {
    const onlineMode = !!this.textAnalyzerModeControl.value;
    const inputText = this.inputControl.value || '';
    if (!inputText) {
      return;
    }

    this.textAnalyzerService.analyzeText(TextAnalyzerTypeEnum.Consonants, inputText, onlineMode).subscribe((result) => {
      console.log(result);
    });
  }
}
