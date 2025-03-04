package com.eazyapp.service.Implementation;

import com.eazyapp.dto.CartDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.model.Cart;
import com.eazyapp.model.Product;
import com.eazyapp.model.User;
import com.eazyapp.repository.CartRepository;
import com.eazyapp.repository.ProductRepository;
import com.eazyapp.repository.UserRepository;
import com.eazyapp.requestwrapper.CartRequestWrapper;
import com.eazyapp.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductRepository productRepository;

	@Override
	public void createCart(CartRequestWrapper cartRequestWrapper,Long userId) throws EazyShoppyException {
		Optional<User> user= userRepository.findById(userId);
		Optional<Product> product= productRepository.findById(cartRequestWrapper.getProductId());
		Optional<Cart> cart= cartRepository.findByProduct(cartRequestWrapper.getProductId(),userId);
		if(user.isEmpty()){
			throw new EazyShoppyException("User not found", 404);
		}
		if (product.isEmpty()){
			throw new EazyShoppyException("Product not found", 404);
		}
		Cart newCart = new Cart();
		if(cart.isEmpty()) {
			newCart.setProduct(product.get());
			newCart.setQuantity(cartRequestWrapper.getQuantity());
			newCart.setTotalAmount(cartRequestWrapper.getQuantity() * product.get().getDiscountPrice());
			newCart.setUser(user.get());
		}
		else {
			throw new EazyShoppyException("Product Already exist", 400);
		}
		cartRepository.save(newCart);
	}
	@Override
	public Cart updateCart(CartRequestWrapper cartRequestWrapper,Long userId) throws EazyShoppyException {
		Optional<Cart> cart=cartRepository.findByProduct(cartRequestWrapper.getProductId(),userId);
		Optional<Product> product= productRepository.findById(cartRequestWrapper.getProductId());
		if(cart.isPresent()){
			cart.get().setQuantity(cartRequestWrapper.getQuantity());
			cart.get().setTotalAmount(cartRequestWrapper.getQuantity()*product.get().getDiscountPrice());
		}
		else {
			throw new EazyShoppyException("Cart not found", 404);
		}
		cartRepository.save(cart.get());
		return cart.get();
	}

	@Override
	public CartDTO getCartById(long id) throws EazyShoppyException {
		Optional<Cart> cart = cartRepository.findById(id);
		if (cart.isPresent()) {
			CartDTO cartDTO = new CartDTO();
			cartDTO.setId(cart.get().getId());
			cartDTO.setProductId(cart.get().getProduct().getProductId());
			cartDTO.setQuantity(cart.get().getQuantity());
			cartDTO.setTotalAmount(cart.get().getTotalAmount());
			return cartDTO;
		} else {
			throw new EazyShoppyException("Cart not found", 404);
		}
	}

	@Override
	public List<CartDTO> getAllCarts( Long id ) throws EazyShoppyException {
		List<Cart> carts = cartRepository.findByUser(id);
		List<CartDTO> cartDTOs = new ArrayList<>();
		for (Cart cart : carts) {
			CartDTO cartDTO = new CartDTO();
			cartDTO.setId(cart.getId());
			cartDTO.setProductId(cart.getProduct().getProductId());
			cartDTO.setProductName(cart.getProduct().getName());
			cartDTO.setQuantity(cart.getQuantity());
			cartDTO.setTotalAmount(cart.getTotalAmount());
			cartDTOs.add(cartDTO);
		}
		return cartDTOs;
	}

	@Override
	public void deleteCart(Long id) throws EazyShoppyException{
		Optional<Cart> cart= cartRepository.findById(id);
		if (cart.isEmpty()){
			throw new EazyShoppyException("Cart not found", 404);
		}
		cartRepository.deleteById(id);
	}
}