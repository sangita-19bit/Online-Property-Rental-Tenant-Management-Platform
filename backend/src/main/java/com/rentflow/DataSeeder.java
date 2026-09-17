package com.rentflow;

import com.rentflow.model.MaintenanceRequest;
import com.rentflow.model.Payment;
import com.rentflow.model.Property;
import com.rentflow.repository.MaintenanceRepository;
import com.rentflow.repository.PaymentRepository;
import com.rentflow.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds MongoDB with initial data on every startup.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final PropertyRepository propertyRepository;
    private final PaymentRepository paymentRepository;
    private final MaintenanceRepository maintenanceRepository;
    private final com.rentflow.repository.UserRepository userRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        // Force refresh for schema changes
        propertyRepository.deleteAll();
        paymentRepository.deleteAll();
        maintenanceRepository.deleteAll();

        seedProperties();
        seedPayments();
        seedMaintenance();
    }

    private void seedUsers() {
        if (!userRepository.existsByUsername("EndUser")) {
            com.rentflow.model.User user = new com.rentflow.model.User();
            user.setUsername("EndUser");
            user.setPassword(passwordEncoder.encode("sangi19"));
            user.setRole("ROLE_ADMIN");
            userRepository.save(user);
            System.out.println("[DataSeeder] Initial user seeded successfully.");
        }
    }

    private void seedProperties() {
        propertyRepository.saveAll(List.of(
            new Property("P-101", "Luxury Villa in Suburbs", "Bengaluru", 15000000,
                "Available", "Ready", List.of("Parking", "Garden", "Pool"),
                "Sale", 4, 3, 3200, "A beautiful luxury villa located in the quiet suburbs of Bengaluru.",
                "Ramesh Builder", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"),
            new Property("P-102", "Skyline Residency", "Bengaluru", 32000,
                "Available", "2026-04-01", List.of("Parking", "Gym"),
                "Rent", 2, 2, 1200, "Modern 2BHK apartment with excellent city views.",
                "Sunil Property Mgmt", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"),
            new Property("P-103", "Palm Grove Apartments", "Pune", 24000,
                "Available", "2026-03-15", List.of("Power Backup", "Security"),
                "Rent", 1, 1, 800, "Cozy 1BHK apartment suitable for bachelors or couples.",
                "Pune Realty", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"),
            new Property("P-104", "Riverfront Heights", "Hyderabad", 28000,
                "Available", "2026-03-20", List.of("Security", "Clubhouse"),
                "Rent", 2, 2, 1100, "Spacious apartment near the IT corridor.",
                "Hyderabad Estates", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"),
            new Property("P-105", "Seaview Condo", "Mumbai", 85000,
                "Available", "Ready", List.of("Sea View", "Pool", "Gym"),
                "Rent", 3, 3, 1800, "Premium sea-facing condo in South Mumbai.",
                "Marine Drive Realty", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"),
            new Property("P-106", "Independent House", "Chennai", 6500000,
                "Available", "Ready", List.of("Garage", "Backyard"),
                "Sale", 3, 2, 2100, "Well maintained independent house in a peaceful neighborhood.",
                "Chennai Homes", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3")
        ));
        System.out.println("[DataSeeder] Properties seeded successfully.");
    }

    private void seedPayments() {
        paymentRepository.saveAll(List.of(
            new Payment("PAY-8801", "EndUser", "Skyline Residency", 32000, "2026-03-05", "Pending"),
            new Payment("PAY-8802", "EndUser", "Riverfront Heights", 28000, "2026-03-01", "Paid")
        ));
        System.out.println("[DataSeeder] Payments seeded successfully.");
    }

    private void seedMaintenance() {
        maintenanceRepository.saveAll(List.of(
            new MaintenanceRequest("MR-401", "EndUser", "Skyline Residency",
                "Kitchen sink leakage", "Medium", "In Progress")
        ));
        System.out.println("[DataSeeder] Maintenance requests seeded successfully.");
    }
}
