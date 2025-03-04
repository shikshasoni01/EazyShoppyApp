package com.eazyapp.requestwrapper;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartRequestWrapper {

    private long productId;
    private int quantity;

}