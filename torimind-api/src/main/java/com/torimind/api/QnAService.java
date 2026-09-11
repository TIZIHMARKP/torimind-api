package com.torimind.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;
import java.util.Map;

@Service
public class QnAService {

    private final String groqApiBaseUrl = "https://api.groq.com/openai/v1";
    private final String groqModel = "openai/gpt-oss-120b";
    private final String groqApiKey;
    private final WebClient webClient;

    public QnAService(@Value("${GROQ_API_KEY}") String groqApiKey, WebClient.Builder webClientBuilder) {
        this.groqApiKey = groqApiKey;
        this.webClient = webClientBuilder.baseUrl(groqApiBaseUrl).build();
    }

    public String getAnswer(String question) {
        Map<String, Object> requestBody = Map.of(
                "model", groqModel,
                "messages", List.of(
                        Map.of("role", "user", "content", question)
                )
        );

        return webClient.post()
                .uri("/chat/completions")
                .header("Authorization", "Bearer " + groqApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}