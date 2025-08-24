package com.joshua.MovieGenieTutorial;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class HomeController {

    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    private final API apiService;
    private final MovieQuery movieQuery;
    private final int moviesToDisplay;

    public HomeController(API apiService, MovieQuery movieQuery) {
        this.apiService = apiService;
        this.movieQuery = movieQuery;
        this.moviesToDisplay = 3;
    }

    @GetMapping("/")
    public String homeRedirect() {
        return "redirect:/home";
    }

    @GetMapping("/home")
    public String home(
            @RequestParam(required = false) String decade,
            @RequestParam(required = false) String genre,
            Model model) {

        if (decade != null && genre != null && !decade.isEmpty() && !genre.isEmpty()) {
            String apiGenre = movieQuery.mapGenre(genre);
            String apiYear = movieQuery.mapYear(decade);

            String[] yearSplit = apiYear.split(",");
            String startDate = yearSplit[0];
            String endDate = (yearSplit.length > 1) ? yearSplit[1] : yearSplit[0];

            List<MovieData> movies = apiService.fetchAndRandomizeMovies(apiGenre, startDate, endDate);

            List<MovieData> shuffledMovies = movies.stream().limit(moviesToDisplay).toList();

            model.addAttribute("movies", shuffledMovies);
            model.addAttribute("selectedDecade", decade);
            model.addAttribute("selectedGenre", genre);

            try {
                ObjectMapper objectMapper = new ObjectMapper();
                String moviesJson = objectMapper.writeValueAsString(shuffledMovies);
                model.addAttribute("moviesJson", moviesJson);
            } catch (JsonProcessingException e) {
                logger.error("Error serializing movies to JSON", e);
                model.addAttribute("moviesJson", "[]"); // Send empty array on error
            }
        }

        return "home";
    }

    @GetMapping("/history")
    public String history() {
        return "history";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }
}