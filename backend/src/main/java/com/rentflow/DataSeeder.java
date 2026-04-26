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
 * Seeds MongoDB with initial data on every startup (only if collections are empty).
 * Mirrors the original mockData.js from the frontend.
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
        if (propertyRepository.count() > 0) return;

        propertyRepository.saveAll(List.of(
            new Property("P-101", "Skyline Residency", "Bengaluru", 32000,
                "Approved", "2026-04-01", List.of("2BHK", "Parking", "Gym")),
            new Property("P-102", "Palm Grove Apartments", "Pune", 24000,
                "Pending Approval", "2026-03-15", List.of("1BHK", "Power Backup")),
            new Property("P-103", "Riverfront Heights", "Hyderabad", 28000,
                "Approved", "2026-03-20", List.of("2BHK", "Security", "Clubhouse"))
        ));

        System.out.println("[DataSeeder] Properties seeded successfully.");
    }

    private void seedPayments() {
        if (paymentRepository.count() > 0) return;

        paymentRepository.saveAll(List.of(
            new Payment("PAY-8801", "Aman Patel", "Skyline Residency", 32000, "2026-03-05", "Pending"),
            new Payment("PAY-8802", "Riya Mittal", "Riverfront Heights", 28000, "2026-03-01", "Paid"),
            new Payment("PAY-8803", "Karan Nair", "Palm Grove Apartments", 24000, "2026-02-28", "Overdue")
        ));

        System.out.println("[DataSeeder] Payments seeded successfully.");
    }

    private void seedMaintenance() {
        if (maintenanceRepository.count() > 0) return;

        maintenanceRepository.saveAll(List.of(
            new MaintenanceRequest("MR-401", "Aman Patel", "Skyline Residency",
                "Kitchen sink leakage", "Medium", "In Progress"),
            new MaintenanceRequest("MR-402", "Riya Kulkarni", "Riverfront Heights",
                "AC not cooling", "High", "Pending"),
            new MaintenanceRequest("MR-403", "Karan Nair", "Palm Grove Apartments",
                "Lift service delay", "Low", "Completed")
        ));

        System.out.println("[DataSeeder] Maintenance requests seeded successfully.");
    }
}
