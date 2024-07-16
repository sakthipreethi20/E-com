package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ecommerce.model.watches;


@Repository
public interface watchesRepository extends JpaRepository<watches,Integer>{

}
