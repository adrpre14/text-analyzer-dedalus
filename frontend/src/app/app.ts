import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BaseApiService} from './shared/services/base-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [BaseApiService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Text Analyzer Dedalus';
}
