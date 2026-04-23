package com.rentflow.controller;

import com.rentflow.model.MaintenanceRequest;
import com.rentflow.service.MaintenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
@RequiredArgsConstructor
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    @GetMapping
    public ResponseEntity<List<MaintenanceRequest>> getAllRequests() {
        return ResponseEntity.ok(maintenanceService.getAllRequests());
    }

    @PostMapping
    public ResponseEntity<MaintenanceRequest> addRequest(@RequestBody MaintenanceRequest request) {
        return ResponseEntity.ok(maintenanceService.addRequest(request));
    }
}
