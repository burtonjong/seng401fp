package com.seng401.controllers;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class EnvTestController {

    @Value("${SUPABASE_PASSWORD:NOT_SET}")
    private String supabasePassword;

    @GetMapping("/env")
    public String getEnvVar() {
        return "Supabase Password: " + supabasePassword;
    }
}
