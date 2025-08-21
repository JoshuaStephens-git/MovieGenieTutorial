package com.joshua.MovieGenieTutorial;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@NoArgsConstructor
@Service
public class API {
    //Logger to check our URL is built properly in the console
    private static final Logger logger = LoggerFactory.getLogger(API.class);

    // Rest will send the HTTP request to the API to receive the required data
    private final RestTemplate restTemplate = new RestTemplate();
    //TMDB
    @Value("${movie.api.key}")
    private String apiKey;
    @Value("${movie.api.pages_to_fetch:8}")
    private int numPages;
    @Value("${movie.api.base_url:https://api.themoviedb.org/3/discover/movie}")
    private String baseUrl;

    //TMDB API URL
    public String createURL(String genreId, String startDate, String endDate, int page) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(baseUrl)
                .queryParam("api_key", apiKey)
                .queryParam("primary_release_date.gte", startDate)
                .queryParam("primary_release_date.lte", endDate)
                .queryParam("page", page)
                .queryParam("include_adult", "false")
                .queryParam("certification_country", "US")
                .queryParam("certification.lte", "R")
                .queryParam("vote_count.gte", 100)
                .queryParam("with_runtime.gte", 100)
                .queryParam("with_original_language", "en")
                .queryParam("region", "US");

        if (genreId != null && !genreId.isEmpty()) {
            builder.queryParam("with_genres", genreId);
        }

        return builder.toUriString();
    }

    public String fetchMoviesFromAPI(String url) {
        logger.info("Fetching movies from URL: {}", url);
        try {
            return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            logger.error("Failed to fetch data from API: {}. Error: {}", url, e.getMessage());
            return "{\"results\":[]}"; // Returns an empty array if there's an error
        }
    }

    public List<MovieData> parseMovies(String jsonResponse) {
        List<MovieData> movies = new ArrayList<>();
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(jsonResponse);
            JsonNode results = root.get("results");
            for (JsonNode movie : results) {
                // Check if fields exist and are not null before accessing
                String title = movie.has("title") ? movie.get("title").asText() : "N/A";
                String releaseDate = movie.has("release_date") ? movie.get("release_date").asText() : "N/A";
                Double rating = movie.has("vote_average") ? movie.get("vote_average").asDouble() : 0.0;
                String overview = movie.has("overview") ? movie.get("overview").asText() : "";
                String id = movie.has("id") ? movie.get("id").asText() : "";
                String posterPath = movie.has("poster_path") ? movie.get("poster_path").asText("") : "";
                movies.add(new MovieData(title, releaseDate, rating, overview, id, posterPath));
            }
        } catch (Exception e) {
            logger.error("Error parsing movie JSON response", e);
        }
        return movies;
    }

    public List<MovieData> fetchAndRandomizeMovies(String genreId, String startDate, String endDate) {
        List<MovieData> randomizedMovies = new ArrayList<>();
        for (int i = 1; i <= numPages; i++) {
            String url = createURL(genreId, startDate, endDate, i);
            String jsonResponse = fetchMoviesFromAPI(url);
            if (jsonResponse != null && !jsonResponse.isEmpty()) {
                List<MovieData> movies = parseMovies(jsonResponse);
                randomizedMovies.addAll(movies);
            }
        }
        Collections.shuffle(randomizedMovies);
        return randomizedMovies;
    }
}
