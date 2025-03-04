package com.eazyapp.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CategoryDTO {
    private Long id;
    private String name;
    private Long parentId;
    private List<CategoryDTO> subcategories = new ArrayList<>();
}