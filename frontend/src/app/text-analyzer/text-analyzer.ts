import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatFormField, MatHint, MatInput} from '@angular/material/input';
import {MatCard} from '@angular/material/card';

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
  templateUrl: './text-analyzer.html',
  styleUrl: './text-analyzer.css'
})
export class TextAnalyzer {
  inputControl = new FormControl('');
  textAnalyzerModeControl = new FormControl(false);

  analyze() {

  }
}
