package com.rentflow.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "properties")
public class Property {

    @Id
    private String id;

    private String title;
    private String city;
    private int rent;
    private String status;
    private String availableFrom;
    private List<String> amenities;

    // Additional fields for the marketplace
    private String type; // "Rent" or "Sale"
    private int bedrooms;
    private int bathrooms;
    private int area; // square feet
    private String description;
    private String sellerInfo;
    private String image; // URL to property image
}
