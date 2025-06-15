package org.dedalus.textanalyzer.service;

import org.dedalus.textanalyzer.model.AnalysisType;
import org.dedalus.textanalyzer.model.TextAnalysisResponse;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class TextAnalyzerServiceTest {
    @Autowired
    private TextAnalyzerService service;

    @Test
    void analyzeVowelsCountsCorrectly() {
        String text = "Hello World!";
        TextAnalysisResponse response = service.analyze(AnalysisType.VOWELS, text);
        assertThat(response.type()).isEqualTo(AnalysisType.VOWELS);
        assertThat(response.fullText()).isEqualTo(text);
        assertThat(response.counts())
            .containsEntry('e', 1)
            .containsEntry('o', 2)
            .hasSize(2);
    }

    @Test
    void analyzeConsonantsCountsCorrectly() {
        String text = "abcABC xyz!";
        TextAnalysisResponse response = service.analyze(AnalysisType.CONSONANTS, text);
        assertThat(response.type()).isEqualTo(AnalysisType.CONSONANTS);
        assertThat(response.fullText()).isEqualTo(text);
        assertThat(response.counts())
            .containsEntry('b', 2)
            .containsEntry('c', 2)
            .containsEntry('x', 1)
            .containsEntry('y', 1)
            .containsEntry('z', 1)
            .hasSize(5);
    }

    @Test
    void analyzeEmptyTextReturnsEmptyCounts() {
        TextAnalysisResponse response = service.analyze(AnalysisType.VOWELS, "");
        assertThat(response.counts()).isEmpty();
    }

    @Test
    void analyzeNoLettersReturnsEmptyCounts() {
        String text = "1234!@#$";
        TextAnalysisResponse vResp = service.analyze(AnalysisType.VOWELS, text);
        assertThat(vResp.counts()).isEmpty();
        TextAnalysisResponse cResp = service.analyze(AnalysisType.CONSONANTS, text);
        assertThat(cResp.counts()).isEmpty();
    }

    @Test
    void analyzeMixedSpecialAndLettersCountsCorrectly() {
        String text = "A!e@i# B$c%";
        TextAnalysisResponse vResp = service.analyze(AnalysisType.VOWELS, text);
        assertThat(vResp.counts())
            .containsEntry('a', 1)
            .containsEntry('e', 1)
            .containsEntry('i', 1)
            .hasSize(3);
        TextAnalysisResponse cResp = service.analyze(AnalysisType.CONSONANTS, text);
        assertThat(cResp.counts())
            .containsEntry('b', 1)
            .containsEntry('c', 1)
            .hasSize(2);
    }
}
