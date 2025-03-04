package com.eazyapp.requestwrapper;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequestWrapper {

    private Long userId;
    private Long addressId;
    private String status;

}
