package com.omkarbillingapp.service;

import com.omkarbillingapp.io.UserRequest;
import com.omkarbillingapp.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
