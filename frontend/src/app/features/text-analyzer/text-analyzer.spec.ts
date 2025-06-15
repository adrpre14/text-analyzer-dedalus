import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnalyzer } from './text-analyzer';
import {BaseApiService} from '../../shared/services/base-api.service';

describe('TextAnalyzer', () => {
  let component: TextAnalyzer;
  let fixture: ComponentFixture<TextAnalyzer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAnalyzer],
      providers: [
        { provide: BaseApiService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAnalyzer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
