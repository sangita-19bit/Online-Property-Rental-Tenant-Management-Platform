package com.rentflow.repository;

import com.rentflow.model.MaintenanceRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceRepository extends MongoRepository<MaintenanceRequest, String> {
    List<MaintenanceRequest> findByTenant(String tenant);
}
