package com.eazyapp.controller;

import com.eazyapp.dto.OrderDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.formatter.ResponseFormatter;
import com.eazyapp.requestwrapper.OrderRequestWrapper;
import com.eazyapp.service.OrderService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PostMapping("/create")
	public ResponseEntity<JSONObject> createOrder(@RequestBody OrderRequestWrapper request) throws EazyShoppyException {

        System.out.println("Create order start");
        orderService.createOrder(request);
		JSONObject response = ResponseFormatter.formatter("Success", 200, "Order created successfully");
        System.out.println("Create order start");
        return new ResponseEntity<>(response, HttpStatus.OK);

	}
    @GetMapping("/getAllOrders")
    public ResponseEntity<JSONObject> getAllOrders() throws EazyShoppyException {
        System.out.println("get all order  start");
        List<OrderDTO> orders = orderService.getAllOrders();
        JSONObject response = ResponseFormatter.formatter("Success", 200, "Orders listed successfully", orders);
        System.out.println("get all order end");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

	@GetMapping("/getOrderByUserId")
	public ResponseEntity<JSONObject> getOrderByUserId(@RequestHeader Long userId) throws EazyShoppyException {
		List<OrderDTO> order = orderService.getOrderByUserId(userId);
		JSONObject response = ResponseFormatter.formatter("Success", 200, "Order retrieved successfully", order);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
    @GetMapping("/getOrderId")
    public ResponseEntity<JSONObject> getOrderById(@RequestHeader Long id) throws EazyShoppyException {
        OrderDTO order = orderService.getOrderById(id);
        JSONObject response = ResponseFormatter.formatter("Success", 200, "Order retrieved successfully", order);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PutMapping("/updateStatus")
    public ResponseEntity<JSONObject> updateStatus(@RequestHeader Long orderId, @RequestHeader String status) throws EazyShoppyException {
        // Validate the status
        if (!isValidStatus(status)) {
            throw new EazyShoppyException("Invalid status value. Allowed values are: Pending, Confirmed, Delivered", 500);
        }

        System.out.println("update order status start");
        orderService.updateStatus(orderId, status);
        JSONObject response = ResponseFormatter.formatter("Success", 200, "Order Status updated successfully");
        System.out.println("update order status end");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private boolean isValidStatus(String status) {
        return status != null && (status.equalsIgnoreCase("Pending")
                || status.equalsIgnoreCase("Confirmed")
                || status.equalsIgnoreCase("Delivered"));
    }


}
