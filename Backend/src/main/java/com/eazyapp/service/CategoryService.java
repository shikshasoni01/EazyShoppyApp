package com.eazyapp.service;

import com.eazyapp.dto.CategoryDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.requestwrapper.CategoryRequestWrapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    void createCategory(CategoryRequestWrapper categoryRequestWrapper) throws EazyShoppyException;

    void deleteCategory(Long categoryId) throws EazyShoppyException;

    void deleteSubcategory(Long subcategoryId) throws EazyShoppyException;

    List<CategoryDTO> getAllCategories() throws EazyShoppyException;

    CategoryDTO getCategoryById(Long id) throws EazyShoppyException;
}