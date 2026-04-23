package com.rentflow.repository;

import com.rentflow.model.MaintenanceRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceRepository extends MongoRepository<MaintenanceRequest, String> {
}
