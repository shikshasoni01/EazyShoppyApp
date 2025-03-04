package com.eazyapp.service.Implementation;

import com.eazyapp.dto.CategoryDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.model.Category;
import com.eazyapp.repository.CategoryRepository;
import com.eazyapp.repository.ProductRepository;
import com.eazyapp.requestwrapper.CategoryRequestWrapper;
import com.eazyapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void createCategory(CategoryRequestWrapper categoryRequestWrapper) throws EazyShoppyException {
        Category category = new Category();
        category.setName(categoryRequestWrapper.getName());

        if (categoryRequestWrapper.getParentId() != null) {
            Category parent = categoryRepository.findById(categoryRequestWrapper.getParentId())
                    .orElseThrow(() -> new EazyShoppyException("Parent category not found", 404));
            category.setParent(parent);
        }
        categoryRepository.save(category);
    }


    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAllWithSubcategories();

        return categories.stream()
                .map(this::convertToDTO) // Recursive mapping
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO getCategoryById(Long id) throws EazyShoppyException {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EazyShoppyException("Category not found", 404));

        return convertToDTO(category);
    }

    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setParentId(category.getParent() != null ? category.getParent().getId() : null);

        if (category.getSubcategories() != null && !category.getSubcategories().isEmpty()) {
            List<CategoryDTO> subcategoryDTOs = category.getSubcategories().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            categoryDTO.setSubcategories(subcategoryDTOs);
        }

        return categoryDTO;
    }

    @Override
    public void deleteCategory(Long categoryId) throws EazyShoppyException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EazyShoppyException("Category not found", 404));

//        // Check if the category has subcategories
//        if (!category.getSubcategories().isEmpty()) {
//            throw new EazyShoppyException("Cannot delete category with subcategories. Delete subcategories first.", 400);
//        }
        deleteSubcategory(categoryId);

        categoryRepository.delete(category);
    }

    @Override
    public void deleteSubcategory(Long subcategoryId) throws EazyShoppyException {
        Category subcategory = categoryRepository.findByIdWithSubcategories(subcategoryId)
                .orElseThrow(() -> new EazyShoppyException("Subcategory not found", 404));



        // Check if the category is referenced by any products (if applicable)
        if (!productRepository.findByCategoryId(subcategory.getId()).isEmpty()) {
            throw new EazyShoppyException("Cannot delete category linked to products. Remove product associations first.", 400);
        }

        // Remove the subcategory reference from its parent category (if it has one)
        if (subcategory.getParent() != null) {
            Category parent = subcategory.getParent();
            parent.getSubcategories().remove(subcategory);
            categoryRepository.save(parent); // Save parent after removing reference
        }

        // Delete the subcategory
        categoryRepository.delete(subcategory);
    }
}
