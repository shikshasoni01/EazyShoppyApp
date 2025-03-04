package com.eazyapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class OrderDTO {

    private Long id;

    private String trackingId;

    private Date date;

    private String status;

    private double totalAmount;

    private String userName;

    private String address;

    private List<ProductDTO> products;

}
