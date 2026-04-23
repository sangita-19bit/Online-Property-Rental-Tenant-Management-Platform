package com.rentflow.controller;

import com.rentflow.model.Property;
import com.rentflow.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        return ResponseEntity.ok(propertyService.getAllProperties());
    }

    @PostMapping
    public ResponseEntity<Property> addProperty(@RequestBody Property property) {
        return ResponseEntity.ok(propertyService.addProperty(property));
    }
}
