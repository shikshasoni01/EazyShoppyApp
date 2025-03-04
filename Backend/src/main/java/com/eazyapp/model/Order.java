package com.eazyapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne
	@JoinColumn(name = "addressId", nullable = false)
	private Address address;

	@OneToMany(mappedBy = "order")
	private List<OrderItem> orderItems;

	private String trackingId;

	private Date date;

	private String status;

	private double totalAmount;


}
