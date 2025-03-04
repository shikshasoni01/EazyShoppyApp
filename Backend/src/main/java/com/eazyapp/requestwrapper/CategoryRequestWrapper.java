package com.eazyapp.requestwrapper;

import com.eazyapp.dto.CategoryDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CategoryRequestWrapper {
    private String name;
    private Long parentId;
    private List<CategoryDTO> subcategories = new ArrayList<>();
}