package org.dedalus.textanalyzer.service;

import org.dedalus.textanalyzer.model.AnalysisType;
import org.dedalus.textanalyzer.model.TextAnalysisResponse;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class TextAnalyzerService {
    public TextAnalysisResponse analyze(AnalysisType type, String text) {
        Map<Character, Integer> letterCounts = text.chars().filter(c -> {
            char character = Character.toLowerCase((char) c);

            if (type == AnalysisType.VOWELS) {
                return "aeiou".indexOf(character) >= 0;
            } else if (type == AnalysisType.CONSONANTS) {
                return character >= 'a' && character <= 'z' && "aeiou".indexOf(character) < 0;
            }
            return false;
        }).collect(
                HashMap::new,
                (map, c) -> map.merge(Character.toLowerCase((char) c), 1, Integer::sum),
                HashMap::putAll
        );

        return new TextAnalysisResponse(
                UUID.randomUUID().toString(),
                text,
                type,
                letterCounts
        );
    }
}
