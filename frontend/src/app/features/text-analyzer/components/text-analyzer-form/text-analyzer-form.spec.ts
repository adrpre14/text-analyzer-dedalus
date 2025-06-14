import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnalyzerForm } from './text-analyzer-form';

describe('TextAnalyzerForm', () => {
  let component: TextAnalyzerForm;
  let fixture: ComponentFixture<TextAnalyzerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAnalyzerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAnalyzerForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
