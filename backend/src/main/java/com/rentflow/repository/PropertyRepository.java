package com.rentflow.repository;

import com.rentflow.model.Property;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends MongoRepository<Property, String> {
}
