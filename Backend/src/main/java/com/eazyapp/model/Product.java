package com.eazyapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productId;

	@Column(nullable = false)
	private String name;

	@Column(name = "brand")
	private String brand;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Category category;

	@Column(name = "ratings")
	private Double ratings;

	@Column(name = "reviews")
	private Integer reviews;

	@Column(name="discount_price")
	private double discountPrice;

	@Column(name="original_price")
	private double originalPrice;

	@Column(name="discount")
	private double discount;

	@Column(name="product_description")
	private String productDescription;

}