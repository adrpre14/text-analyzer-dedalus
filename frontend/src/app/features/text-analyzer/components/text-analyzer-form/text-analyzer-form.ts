import {Component, inject} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {TitleCasePipe} from '@angular/common';
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
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-text-analyzer-form',
  imports: [
    CdkTextareaAutosize,
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
    TransformTextAnalysisCountPipe,
    TitleCasePipe
  ],
  templateUrl: './text-analyzer-form.html',
  styleUrl: './text-analyzer-form.css'
})
export class TextAnalyzerForm {
  inputControl = new FormControl('');
  textAnalyzerModeControl = new FormControl(false);
  typeOfAnalysisControl = new FormControl<TextAnalyzerTypeEnum>(TextAnalyzerTypeEnum.CONSONANTS);

  typeOfAnalysisOptions = Object.entries(TextAnalyzerTypeEnum).filter(entry => {
    const [key, value] = entry;
    return typeof value === 'number' && isNaN(Number(key));
  }).map(entry => ({
    key: entry[0],
    value: entry[1] as TextAnalyzerTypeEnum
  }));

  textAnalyzerService = inject(TextAnalyzerService);
  private _snackBar = inject(MatSnackBar);
  public readonly TextAnalyzerTypeEnum = TextAnalyzerTypeEnum;

  analyze() {
    const onlineMode = !!this.textAnalyzerModeControl.value;
    const inputText = this.inputControl.value || '';
    const typeOfAnalysis = this.typeOfAnalysisControl.value || TextAnalyzerTypeEnum.CONSONANTS;
    if (!inputText) {
      return;
    }

    this.textAnalyzerService.analyzeText(typeOfAnalysis, inputText, onlineMode).subscribe(
      {
        next: (result) => this.textAnalyzerService.addToHistory(result),
        error: () => {
          this._snackBar.open('Something went wrong while analyzing the text.', 'Dismiss', {
            duration: 3000
          })
        }
      }
      );
  }
}
