package com.eazyapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {

    private long productId;

    private String name;

    private String brand;

    private Long categoryId;

    private String categoryName;

    private Double ratings;

    private Integer reviews;

    private double originalPrice;

    private double discountedPrice;

    private double discount;

    private String productDescription;
}