package com.joshua.MovieGenieTutorial;

import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class MovieQuery {

    public MovieQuery() {
    }

    public String mapGenre(String userGenre) {
        if (userGenre == null) return "";
        return switch (userGenre.toLowerCase().trim()) {
            case "action" -> "28";
            case "adventure" -> "12";
            case "animation" -> "16";
            case "comedy" -> "35";
            case "crime" -> "80";
            case "documentary" -> "99";
            case "drama" -> "18";
            case "family" -> "10751";
            case "fantasy" -> "14";
            case "game-show" -> "10763";
            case "history" -> "36";
            case "horror" -> "27";
            case "musical" -> "10402";
            case "mystery" -> "9648";
            case "romance" -> "10749";
            case "sci-fi" -> "878";
            case "thriller" -> "53";
            case "war" -> "10752";
            case "western" -> "37";
            case "all" -> "";
            default -> "";
        };
    }

    public String mapYear(String userYear) {
        if (userYear == null) return "";
        return switch (userYear.trim()) {
            case "all" -> "1930-01-01," + LocalDate.now();
            case "pre70s" -> "1930-01-01,1969-12-31";
            case "70s" -> "1970-01-01,1979-12-31";
            case "80s" -> "1980-01-01,1989-12-31";
            case "90s" -> "1990-01-01,1999-12-31";
            case "00s" -> "2000-01-01,2009-12-31";
            case "10s" -> "2010-01-01,2019-12-31";
            case "20s" -> "2020-01-01," + LocalDate.now();
            default -> "";
        };
    }
}
