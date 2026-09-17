package com.rentflow.controller;

import com.rentflow.model.Payment;
import com.rentflow.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(paymentService.getAllPayments().stream()
                .filter(p -> username.equals(p.getTenant()) || "ROLE_ADMIN".equals(authentication.getAuthorities().iterator().next().getAuthority()))
                .toList());
    }

    @PostMapping
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment, Authentication authentication) {
        payment.setTenant(authentication.getName());
        return ResponseEntity.ok(paymentService.addPayment(payment));
    }
}
