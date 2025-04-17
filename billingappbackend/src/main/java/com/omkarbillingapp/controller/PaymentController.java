package com.omkarbillingapp.controller;

import com.omkarbillingapp.io.OrderResponse;
import com.omkarbillingapp.io.PaymentRequest;
import com.omkarbillingapp.io.PaymentVerificationRequest;
import com.omkarbillingapp.io.RazorpayOrderResponse;
import com.omkarbillingapp.service.OrderService;
import com.omkarbillingapp.service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException{
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request){
        return orderService.verifyPayment(request);
    }
}
