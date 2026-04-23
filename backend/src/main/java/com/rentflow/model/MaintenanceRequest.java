package com.rentflow.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "maintenance_requests")
public class MaintenanceRequest {

    @Id
    private String id;

    private String tenant;
    private String property;
    private String issue;
    private String priority;
    private String status;
}
