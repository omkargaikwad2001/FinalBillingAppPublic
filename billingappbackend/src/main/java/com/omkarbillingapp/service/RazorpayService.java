package com.omkarbillingapp.service;

import com.omkarbillingapp.io.RazorpayOrderResponse;
import com.razorpay.RazorpayException;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount,String currency) throws RazorpayException;
}
