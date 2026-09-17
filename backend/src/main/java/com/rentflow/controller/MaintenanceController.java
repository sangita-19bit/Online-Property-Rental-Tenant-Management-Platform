package com.rentflow.controller;

import com.rentflow.model.MaintenanceRequest;
import com.rentflow.service.MaintenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/maintenance")
@RequiredArgsConstructor
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    @GetMapping
    public ResponseEntity<List<MaintenanceRequest>> getAllRequests(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(maintenanceService.getAllRequests().stream()
                .filter(m -> username.equals(m.getTenant()) || "ROLE_ADMIN".equals(authentication.getAuthorities().iterator().next().getAuthority()))
                .toList());
    }

    @PostMapping
    public ResponseEntity<MaintenanceRequest> addRequest(@RequestBody MaintenanceRequest request, Authentication authentication) {
        request.setTenant(authentication.getName());
        return ResponseEntity.ok(maintenanceService.addRequest(request));
    }
}
