package com.joshua.MovieGenieTutorial;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public record MovieData(String title, String releaseDate, Double rating, String overview, String id,
                        String posterPath) {

    private static final DateTimeFormatter INPUT_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final DateTimeFormatter OUTPUT_FORMATTER = DateTimeFormatter.ofPattern("MM/dd/yyyy");

    public String getFormattedReleaseDate() {
        if (this.releaseDate == null || this.releaseDate.trim().isEmpty()) {
            return "N/A";
        }
        try {
            LocalDate date = LocalDate.parse(this.releaseDate, INPUT_FORMATTER);
            return date.format(OUTPUT_FORMATTER);
        } catch (DateTimeParseException e) {
            return this.releaseDate;
        }
    }

    public String getFormattedRating() {
        if (this.rating == null) {
            return "N/A";
        }
        return String.format("%.1f", this.rating);
    }
}
