package com.eazyapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cart",
		uniqueConstraints = {
@UniqueConstraint(columnNames = {"user_id", "product_id"}) // Prevents duplicate product entries per user
})
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private int quantity;

	@Column(nullable = false)
	private double totalAmount;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
}