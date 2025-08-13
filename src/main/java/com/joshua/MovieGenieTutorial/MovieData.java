package com.joshua.MovieGenieTutorial;

import java.text.SimpleDateFormat;
import java.util.Date;

public record MovieData(String title, String releaseDate, Double rating, String overview, String id,
                        String posterPath) {

    public String getFormattedReleaseDate() {
        if (this.releaseDate == null || this.releaseDate.trim().isEmpty()) {
            return "N/A";
        }
        try {
            SimpleDateFormat originalFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date date = originalFormat.parse(this.releaseDate);
            SimpleDateFormat newFormat = new SimpleDateFormat("MM/dd/yyyy");
            return newFormat.format(date);
        } catch (Exception e) {
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
