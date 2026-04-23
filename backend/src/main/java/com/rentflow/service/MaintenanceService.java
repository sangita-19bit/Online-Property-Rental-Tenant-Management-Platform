package com.rentflow.service;

import com.rentflow.model.MaintenanceRequest;
import com.rentflow.repository.MaintenanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;

    public List<MaintenanceRequest> getAllRequests() {
        return maintenanceRepository.findAll();
    }

    public MaintenanceRequest addRequest(MaintenanceRequest request) {
        return maintenanceRepository.save(request);
    }

    public long countPending() {
        return maintenanceRepository.findAll()
                .stream()
                .filter(r -> "Pending".equalsIgnoreCase(r.getStatus()) || "In Progress".equalsIgnoreCase(r.getStatus()))
                .count();
    }
}
