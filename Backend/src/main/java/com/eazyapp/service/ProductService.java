package com.eazyapp.service;

import com.eazyapp.dto.ProductDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.requestwrapper.ProductRequestWrapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface ProductService {

    Long createProduct(ProductRequestWrapper productRequestWrapper) throws EazyShoppyException;

    ProductDTO getProductById(long id) throws EazyShoppyException;

    List<ProductDTO> getAllProducts() throws EazyShoppyException;

    void setProductImage(  MultipartFile file,Long productId) throws IOException;

    List<ProductDTO> getProductByCategoryId(Long categoryId) throws EazyShoppyException;

    List<ProductDTO> filterProductByName(String name) throws EazyShoppyException;

    void deleteProduct(Long id ) throws EazyShoppyException;

//     ProductImageDTO getProductImage(Long id) throws EazyShoppyException;

}