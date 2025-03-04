package com.eazyapp.repository;

import com.eazyapp.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    // Find all carts with a total amount greater than or equal to a given value
    @Query("SELECT c FROM Cart c WHERE c.totalAmount >= ?1")
    List<Cart> findByTotalAmountGreaterThanEqual(double totalAmount);

    // Find all carts with a total amount less than or equal to a given value
    @Query("SELECT c FROM Cart c WHERE c.totalAmount <= ?1")
    List<Cart> findByTotalAmountLessThanEqual(double totalAmount);

    @Query("SELECT c FROM Cart c WHERE  c.user.id = :userId")
    List<Cart> findByUser(Long userId);

    @Query("SELECT c FROM Cart c WHERE  c.product.id = :productId and c.user.id = :userId")
    Optional<Cart> findByProduct(Long productId,Long userId);

    @Query("SELECT c.product.id FROM Cart c WHERE c.user.id = :userId")
    List<Long> findProductByUserId(Long userId);

    @Modifying
    @Query("DELETE FROM Cart c WHERE c.user.id = :userId")
    void deleteByUser(Long userId);
}