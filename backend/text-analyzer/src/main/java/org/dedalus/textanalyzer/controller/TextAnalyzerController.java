package org.dedalus.textanalyzer.controller;

import org.dedalus.textanalyzer.model.TextAnalysisResponse;
import org.dedalus.textanalyzer.service.TextAnalyzerService;
import org.dedalus.textanalyzer.model.AnalysisType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Arrays;

@CrossOrigin(origins = "*")
@RestController
public class TextAnalyzerController {

    private final TextAnalyzerService textAnalyzerService;

    @Autowired
    public TextAnalyzerController(TextAnalyzerService textAnalyzerService) {
        this.textAnalyzerService = textAnalyzerService;
    }

    @GetMapping("/analyze")
    public TextAnalysisResponse analyze(
            @RequestParam("type") AnalysisType type,
            @RequestParam("text") String text) {
        return textAnalyzerService.analyze(type, text);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<String> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String msg = String.format("Invalid value '%s' for parameter '%s'. Allowed values are %s.",
                ex.getValue(),
                ex.getPropertyName(),
                Arrays.toString(AnalysisType.values()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
    }
}
