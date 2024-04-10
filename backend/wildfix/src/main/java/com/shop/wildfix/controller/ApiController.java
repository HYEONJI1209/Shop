package com.shop.wildfix.controller;

import com.shop.wildfix.domain.Member;
import com.shop.wildfix.dto.RegisterRequest;
import com.shop.wildfix.domain.MemberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// webConfig.java 생성하기
@RestController
public class ApiController {

    private static final Logger logger = LoggerFactory.getLogger(ApiController.class);

    @Autowired
    private MemberRepository memberRepository;

    @PostMapping("/api/resData")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        logger.info("Registration request received: {}", registerRequest);

        // 사용자명이 이미 존재하는지 검사
        if (memberRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            logger.warn("Registration attempt with existing username: {}", registerRequest.getUsername());
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        // RegisterRequest 객체로부터 Member 객체를 생성
        Member newMember = new Member();
        newMember.setUsername(registerRequest.getUsername());
        newMember.setPassword(registerRequest.getPassword());
        newMember.setEmail(registerRequest.getEmail());

        // Member 객체를 DB에 저장
        memberRepository.save(newMember);
        logger.info("User registered successfully: {}", registerRequest.getUsername());

        // 응답 반환
        return ResponseEntity.ok().body("User registered successfully");
    }
}
