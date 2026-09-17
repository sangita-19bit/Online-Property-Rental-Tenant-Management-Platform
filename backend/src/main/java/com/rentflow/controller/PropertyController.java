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
    public ResponseEntity<List<Property>> getAllProperties(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Integer bedrooms
    ) {
        List<Property> properties = propertyService.getAllProperties();
        
        if (type != null && !type.isEmpty()) {
            properties = properties.stream().filter(p -> type.equalsIgnoreCase(p.getType())).toList();
        }
        if (city != null && !city.isEmpty()) {
            properties = properties.stream().filter(p -> p.getCity().toLowerCase().contains(city.toLowerCase())).toList();
        }
        if (bedrooms != null) {
            properties = properties.stream().filter(p -> p.getBedrooms() == bedrooms).toList();
        }

        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable String id) {
        return ResponseEntity.ok(propertyService.getPropertyById(id));
    }

    @PostMapping
    public ResponseEntity<Property> addProperty(@RequestBody Property property) {
        return ResponseEntity.ok(propertyService.addProperty(property));
    }
}
