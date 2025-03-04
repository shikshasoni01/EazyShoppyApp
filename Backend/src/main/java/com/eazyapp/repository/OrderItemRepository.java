package com.eazyapp.repository;

import com.eazyapp.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

    @Query("SELECT o FROM OrderItem o WHERE o.order.id = :orderId")
    List<OrderItem> findOrderItemsByOrderId(Long orderId);
}
