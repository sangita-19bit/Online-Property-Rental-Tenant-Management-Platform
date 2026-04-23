package com.rentflow.service;

import com.rentflow.model.Payment;
import com.rentflow.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }
}
