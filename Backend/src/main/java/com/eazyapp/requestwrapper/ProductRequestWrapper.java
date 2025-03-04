package com.eazyapp.requestwrapper;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequestWrapper {

    private String name;

    private String brand;

    private Long categoryId;

    private Double ratings;

    private Integer reviews;

    private double originalPrice;

    private double discount;

    private String productDescription;

}