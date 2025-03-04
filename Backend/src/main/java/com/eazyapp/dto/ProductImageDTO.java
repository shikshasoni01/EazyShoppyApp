package com.eazyapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductImageDTO {

//    private Long productId;

    private List<byte[]> images;
}
