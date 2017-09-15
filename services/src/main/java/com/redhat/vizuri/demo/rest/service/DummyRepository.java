package com.redhat.vizuri.demo.rest.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DummyRepository {

    @CrossOrigin
    @RequestMapping("/dummy")
    public ResponseEntity<String> dummy() {
        return ResponseEntity.ok("You are a dummy!");
    }
}