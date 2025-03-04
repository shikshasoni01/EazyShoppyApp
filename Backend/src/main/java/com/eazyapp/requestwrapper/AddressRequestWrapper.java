package com.eazyapp.requestwrapper;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequestWrapper {
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private Long userId;

    // Getter and Setter
}