package com.eazyapp.repository;

import com.eazyapp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find a product by its name
    @Query("SELECT p FROM Product p WHERE p.name = ?1")
    Optional<Product> findByName(String name);

    // Find all products by category ID
    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId")
    List<Product> findByCategoryId(long categoryId);

//    // Find products with a price greater than or equal to a given value
//    @Query("SELECT p FROM Product p WHERE p.price >= ?1")
//    List<Product> findByPriceGreaterThanEqual(double price);
//
//    // Find products with a price less than or equal to a given value
//    @Query("SELECT p FROM Product p WHERE p.price <= ?1")
//    List<Product> findByPriceLessThanEqual(double price);

    // Find products by name containing a specific keyword (case-insensitive)
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Product> findByNameContainingIgnoreCase(String keyword);
}