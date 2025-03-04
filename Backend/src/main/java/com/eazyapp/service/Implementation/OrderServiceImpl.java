package com.eazyapp.service.Implementation;

import com.eazyapp.dto.OrderDTO;
import com.eazyapp.dto.ProductDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.model.*;
import com.eazyapp.repository.*;
import com.eazyapp.requestwrapper.OrderRequestWrapper;
import com.eazyapp.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository  orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public void createOrder(OrderRequestWrapper orderRequestWrapper) throws EazyShoppyException {
        Optional<User> user= userRepository.findById(orderRequestWrapper.getUserId());
        Optional<Address> address= addressRepository.findAddressByIdAndUserId(orderRequestWrapper.getAddressId(),orderRequestWrapper.getUserId());
        if(user.isEmpty()){
            throw new EazyShoppyException("User Not Found ",404);
        }
        if(address.isEmpty()){
            throw new EazyShoppyException("Address with this user Not Found ",404);
        }
        List<Cart> cart= cartRepository.findByUser(user.get().getId());
        List<Long> productIds= cartRepository.findProductByUserId(user.get().getId());
        double totalAmount= 0;
        List<Product> products=new ArrayList<>();

        for (Long productId:productIds){
            Optional<Product> product=productRepository.findById(productId);
            if (product.isEmpty()){
                throw new EazyShoppyException("Product not found",404);
            }
            products.add(product.get());
            double amount = product.get().getDiscountPrice();
            totalAmount+=amount;
            }
        Order order= new Order();
        if(!cart.isEmpty()){


            String randomUUID = UUID.randomUUID().toString();
            while (null != userRepository.findOneUniqueId(randomUUID)) {
                randomUUID = UUID.randomUUID().toString();
            }
            order.setTrackingId(randomUUID);
            order.setStatus(orderRequestWrapper.getStatus());
            order.setDate(new Date());
            order.setUser(user.get());
            order.setAddress(address.get());
            order.setTotalAmount(totalAmount);
        }else {
            throw new EazyShoppyException("Cart is Empty",400);
        }
        orderRepository.save(order);
        setOrderItems(order,products);
        cartRepository.deleteByUser(user.get().getId());
    }
     void setOrderItems(Order order,List<Product> products){
        Optional<Order> order1= orderRepository.findById(order.getId());
        if (order1.isEmpty()){
            throw new EazyShoppyException("order not created ",404);
        }
        for (Product product:products){
            OrderItem orderItem= new OrderItem();
            orderItem.setProduct(product);
            orderItem.setOrder(order1.get());
            orderItemRepository.save(orderItem);
        }
    }

    @Override
    public List<OrderDTO> getAllOrders() throws EazyShoppyException {
        List<Order> orders = orderRepository.findAll();

        List<OrderDTO> orderDTOS= new ArrayList<>();
        for (Order order:orders){
            Optional<User> user= userRepository.findById(order.getUser().getId());
            Optional<Address> address= addressRepository.findAddressByIdAndUserId(order.getAddress().getId(), order.getUser().getId());
            List<OrderItem> orderItemList=orderItemRepository.findOrderItemsByOrderId(order.getId());
            if(user.isEmpty()){
                throw new EazyShoppyException("User Not Found ",404);
            }
            if(address.isEmpty()){
                throw new EazyShoppyException("Address with this user Not Found ",404);
            }
            if(orderItemList.isEmpty()){
                throw new EazyShoppyException("No Item Exists ",404);
            }
            OrderDTO orderDTO= new OrderDTO();
            orderDTO.setId(order.getId());
            orderDTO.setUserName(user.get().getName());
            orderDTO.setAddress( address.get().getStreet()+", "+
                    address.get().getCity()+", "+address.get().getState().toUpperCase()
                    +", "+address.get().getCountry().toUpperCase()+" "+
                    address.get().getZipCode());
            orderDTO.setDate(order.getDate());
            orderDTO.setTrackingId(order.getTrackingId());
            orderDTO.setTotalAmount(order.getTotalAmount());
            List<ProductDTO> products=new ArrayList<>();
            for (OrderItem orderItem:orderItemList)
            {
                ProductDTO productDTO = new ProductDTO();
                productDTO.setProductDescription(orderItem.getProduct().getProductDescription());
                productDTO.setProductId(orderItem.getProduct().getProductId());
                productDTO.setName(orderItem.getProduct().getName());
                productDTO.setBrand(orderItem.getProduct().getBrand());
                productDTO.setReviews(orderItem.getProduct().getReviews());
                productDTO.setRatings(orderItem.getProduct().getRatings());
                productDTO.setOriginalPrice(orderItem.getProduct().getOriginalPrice());
                productDTO.setDiscount(orderItem.getProduct().getDiscount());
                productDTO.setDiscountedPrice(orderItem.getProduct().getDiscountPrice());
                productDTO.setCategoryId(orderItem.getProduct().getCategory().getId());
                productDTO.setCategoryName(orderItem.getProduct().getCategory().getName());
                products.add(productDTO);
            }
            orderDTO.setProducts(products);
            orderDTO.setStatus(order.getStatus());

            orderDTOS.add(orderDTO);
        }
        return orderDTOS;
    }

    @Override
    public List<OrderDTO> getOrderByUserId(Long id) throws EazyShoppyException {
        List<Order> orders = orderRepository.findOrdersByUserId(id);
        List<OrderDTO> orderDTOS= new ArrayList<>();
        for (Order order:orders){
            Optional<User> user= userRepository.findById(order.getUser().getId());
            Optional<Address> address= addressRepository.findAddressByIdAndUserId(order.getAddress().getId(), order.getUser().getId());
            List<OrderItem> orderItemList=orderItemRepository.findOrderItemsByOrderId(order.getId());
            if(user.isEmpty()){
                throw new EazyShoppyException("User Not Found ",404);
            }
            if(address.isEmpty()){
                throw new EazyShoppyException("Address with this user Not Found ",404);
            }
            if(orderItemList.isEmpty()){
                throw new EazyShoppyException("No Item Exists ",404);
            }
            OrderDTO orderDTO= new OrderDTO();
            orderDTO.setId(order.getId());
            orderDTO.setUserName(user.get().getName());
            orderDTO.setAddress( address.get().getStreet()+", "+
                    address.get().getCity()+", "+address.get().getState().toUpperCase()
                    +", "+address.get().getCountry().toUpperCase()+" "+
                    address.get().getZipCode());
            orderDTO.setDate(order.getDate());
            orderDTO.setTrackingId(order.getTrackingId());
            orderDTO.setTotalAmount(order.getTotalAmount());
            List<ProductDTO> products=new ArrayList<>();
            for (OrderItem orderItem:orderItemList)
            {
                ProductDTO productDTO = new ProductDTO();
                productDTO.setProductDescription(orderItem.getProduct().getProductDescription());
                productDTO.setProductId(orderItem.getProduct().getProductId());
                productDTO.setName(orderItem.getProduct().getName());
                productDTO.setBrand(orderItem.getProduct().getBrand());
                productDTO.setReviews(orderItem.getProduct().getReviews());
                productDTO.setRatings(orderItem.getProduct().getRatings());
                productDTO.setOriginalPrice(orderItem.getProduct().getOriginalPrice());
                productDTO.setDiscount(orderItem.getProduct().getDiscount());
                productDTO.setDiscountedPrice(orderItem.getProduct().getDiscountPrice());
                productDTO.setCategoryId(orderItem.getProduct().getCategory().getId());
                productDTO.setCategoryName(orderItem.getProduct().getCategory().getName());
                products.add(productDTO);
            }
            orderDTO.setProducts(products);
            orderDTO.setStatus(order.getStatus());

            orderDTOS.add(orderDTO);
        }
        return orderDTOS;

    }

    @Override
    public OrderDTO getOrderById(Long id) throws EazyShoppyException {
        Optional<Order> order = orderRepository.findById(id);
       if (order.isEmpty())
       {
           throw new EazyShoppyException("No Order Exists ",404);
       }
            Optional<User> user= userRepository.findById(order.get().getUser().getId());
            Optional<Address> address= addressRepository.findAddressByIdAndUserId(order.get().getAddress().getId(), order.get().getUser().getId());
            List<OrderItem> orderItemList=orderItemRepository.findOrderItemsByOrderId(order.get().getId());
            if(user.isEmpty()){
                throw new EazyShoppyException("User Not Found ",404);
            }
            if(address.isEmpty()){
                throw new EazyShoppyException("Address with this user Not Found ",404);
            }
            if(orderItemList.isEmpty()){
                throw new EazyShoppyException("No Item Exists ",404);
            }
            OrderDTO orderDTO= new OrderDTO();
            orderDTO.setId(order.get().getId());
            orderDTO.setUserName(user.get().getName());
            orderDTO.setAddress( address.get().getStreet()+", "+
                    address.get().getCity()+", "+address.get().getState().toUpperCase()
                    +", "+address.get().getCountry().toUpperCase()+" "+
                    address.get().getZipCode());
            orderDTO.setDate(order.get().getDate());
            orderDTO.setTrackingId(order.get().getTrackingId());
            orderDTO.setTotalAmount(order.get().getTotalAmount());
            List<ProductDTO> products=new ArrayList<>();
            for (OrderItem orderItem:orderItemList)
            {
                ProductDTO productDTO = new ProductDTO();
                productDTO.setProductDescription(orderItem.getProduct().getProductDescription());
                productDTO.setProductId(orderItem.getProduct().getProductId());
                productDTO.setName(orderItem.getProduct().getName());
                productDTO.setBrand(orderItem.getProduct().getBrand());
                productDTO.setReviews(orderItem.getProduct().getReviews());
                productDTO.setRatings(orderItem.getProduct().getRatings());
                productDTO.setOriginalPrice(orderItem.getProduct().getOriginalPrice());
                productDTO.setDiscount(orderItem.getProduct().getDiscount());
                productDTO.setDiscountedPrice(orderItem.getProduct().getDiscountPrice());
                productDTO.setCategoryId(orderItem.getProduct().getCategory().getId());
                productDTO.setCategoryName(orderItem.getProduct().getCategory().getName());
                products.add(productDTO);
            }
            orderDTO.setProducts(products);
            orderDTO.setStatus(order.get().getStatus());

        return orderDTO;
    }

    @Override
    public void updateStatus(Long orderId,String status) throws EazyShoppyException
    {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isEmpty())
        {
            throw new EazyShoppyException("No Order Exists ",404);
        }
        order.get().setStatus(status);
        orderRepository.save(order.get());
    }
}
