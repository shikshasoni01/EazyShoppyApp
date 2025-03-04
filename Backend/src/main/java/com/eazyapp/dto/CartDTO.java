package com.eazyapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartDTO {

    private long Id;
    private long productId;
    private String productName;
    private int quantity;
    private double totalAmount;

}