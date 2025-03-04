package com.eazyapp.service;

import com.eazyapp.dto.CartDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.model.Cart;
import com.eazyapp.requestwrapper.CartRequestWrapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {

    void createCart(CartRequestWrapper cartRequestWrapper,Long userId) throws EazyShoppyException;

    CartDTO getCartById(long id) throws EazyShoppyException;

    List<CartDTO> getAllCarts(Long userid) throws EazyShoppyException;

    Cart updateCart(CartRequestWrapper cartRequestWrapper, Long userId) throws EazyShoppyException;

    void deleteCart(Long id) throws EazyShoppyException;
}