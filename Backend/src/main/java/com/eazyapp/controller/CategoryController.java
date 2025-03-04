package com.eazyapp.controller;

import com.eazyapp.dto.CategoryDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.formatter.ResponseFormatter;
import com.eazyapp.requestwrapper.CategoryRequestWrapper;
import com.eazyapp.service.CategoryService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<JSONObject> createCategory(@RequestBody CategoryRequestWrapper categoryRequestWrapper) throws EazyShoppyException {
        categoryService.createCategory(categoryRequestWrapper);
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Category created successfully");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/getAllCategories")
    public ResponseEntity<JSONObject> getAllCategories() throws EazyShoppyException {
        List<CategoryDTO> categories = categoryService.getAllCategories();
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Categories listed successfully", categories);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/getCategoryById")
    public ResponseEntity<JSONObject> getCategoryById(@RequestHeader Long id) throws EazyShoppyException {
        CategoryDTO category = categoryService.getCategoryById(id);
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Category retrieved successfully", category);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @DeleteMapping("/deleteCategory")
    public ResponseEntity<JSONObject> deleteCategory(@RequestHeader Long categoryId) throws EazyShoppyException {
        categoryService.deleteCategory(categoryId);
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Category deleted successfully");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @DeleteMapping("/deleteSubCategory")
    public ResponseEntity<JSONObject> deleteSubCategory(@RequestHeader Long subcategoryId) throws EazyShoppyException {
        categoryService.deleteSubcategory(subcategoryId);
        JSONObject data = ResponseFormatter.formatter("Success", 200, "Subcategory deleted successfully");
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
