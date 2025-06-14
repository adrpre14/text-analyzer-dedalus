package org.dedalus.textanalyzer.model;

import java.util.Map;

public record TextAnalysisResponse(
        String id,
        String fullText,
        AnalysisType type,
        Map<Character, Integer> counts
) {}
