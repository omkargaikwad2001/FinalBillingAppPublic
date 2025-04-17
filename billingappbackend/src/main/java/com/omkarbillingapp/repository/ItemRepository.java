package com.omkarbillingapp.repository;

import com.omkarbillingapp.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity,Long> {

    Optional<ItemEntity>findByItemId(String id);
    Integer countByCategoryId(Long id);
}
