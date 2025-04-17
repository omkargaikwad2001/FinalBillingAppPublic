package com.omkarbillingapp.service;

import com.omkarbillingapp.io.CategoryRequest;
import com.omkarbillingapp.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    public CategoryResponse add(CategoryRequest request, MultipartFile file);

    public List<CategoryResponse> read();

    public void delete(String categoryId);

}
