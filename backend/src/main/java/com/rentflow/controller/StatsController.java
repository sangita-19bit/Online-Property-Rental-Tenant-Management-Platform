package com.rentflow.controller;

import com.rentflow.service.MaintenanceService;
import com.rentflow.service.PaymentService;
import com.rentflow.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final PropertyService propertyService;
    private final PaymentService paymentService;
    private final MaintenanceService maintenanceService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getStats() {
        // Compute monthly revenue from all payments
        long monthlyRevenue = paymentService.getAllPayments()
                .stream()
                .mapToLong(p -> p.getAmount())
                .sum();

        // Count occupied = payments where status is Paid
        long occupied = paymentService.getAllPayments()
                .stream()
                .filter(p -> "Paid".equalsIgnoreCase(p.getStatus()))
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("properties", propertyService.countProperties());
        stats.put("occupied", occupied);
        stats.put("monthlyRevenue", monthlyRevenue);
        stats.put("pendingMaintenance", maintenanceService.countPending());

        return ResponseEntity.ok(stats);
    }
}
