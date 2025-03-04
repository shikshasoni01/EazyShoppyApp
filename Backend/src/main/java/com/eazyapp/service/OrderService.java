package com.eazyapp.service;

import com.eazyapp.dto.OrderDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.requestwrapper.OrderRequestWrapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
   void createOrder(OrderRequestWrapper orderRequestWrapper) throws EazyShoppyException;

   List<OrderDTO> getAllOrders() throws EazyShoppyException;

    List<OrderDTO> getOrderByUserId(Long userId) throws EazyShoppyException;

   OrderDTO getOrderById(Long id) throws EazyShoppyException;

    void updateStatus(Long orderId,String status) throws EazyShoppyException;

}