package com.omkarbillingapp.service;

import com.omkarbillingapp.io.ItemRequest;
import com.omkarbillingapp.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse>fetchItems();

    void deleteitem(String itemId);
}
