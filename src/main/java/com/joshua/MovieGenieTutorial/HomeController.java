package com.joshua.MovieGenieTutorial;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    public HomeController() {
    }

@GetMapping("/")
public String homeRedirect() {
    return "redirect:/home";
}
@GetMapping("/home")
    public String home() {
        return "home";
    }
}