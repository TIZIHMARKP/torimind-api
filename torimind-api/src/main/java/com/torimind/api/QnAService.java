package com.torimind.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class QnAService {

    private final String geminiApiBaseUrl = "https://generativelanguage.googleapis.com/v1beta";
    private final String geminiModel = "gemini-2.5-flash"; // Correct, stable model name
    private final String geminiApiKey;
    private final WebClient webClient;

    // Inject the API key and the pre-configured WebClient.Builder
    public QnAService(@Value("${GEMINI_API_KEY}") String geminiApiKey, WebClient.Builder webClientBuilder) {
        this.geminiApiKey = geminiApiKey;
        this.webClient = webClientBuilder.baseUrl(geminiApiBaseUrl).build();
    }

    public String getAnswer(String question) {
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", question)
                        })
                }
        );

        return webClient.post()
                .uri("/models/{model}:generateContent", geminiModel) // Use uriBuilder for path params
                .header("x-goog-api-key", geminiApiKey) // Key goes in the header
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block(); // For blocking in a simple tutorial. Ok for now.
    }
}
