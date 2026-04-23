package com.rentflow.controller;

import com.rentflow.model.Payment;
import com.rentflow.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @PostMapping
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment) {
        return ResponseEntity.ok(paymentService.addPayment(payment));
    }
}
