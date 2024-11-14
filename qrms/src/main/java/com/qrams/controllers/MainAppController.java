package com.qrams.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainAppController {
    @GetMapping
    public String getDefault(){
        return "QR Management System";
    }

    @GetMapping("/mainapp")
    public String mainapp(@RequestParam(value="name", defaultValue = "Vanshika") String name){
        return String.format("Hello %s", name);
    }
}
