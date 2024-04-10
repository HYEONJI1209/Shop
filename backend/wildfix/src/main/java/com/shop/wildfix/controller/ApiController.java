package com.shop.wildfix.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000") // CORS 어노테이션
@RestController
public class ApiController {
    @PostMapping("/api/resData")
    public String hello(@RequestBody String data) {
        return data;
    }
}