package com.eazyapp.service.Implementation;

import com.eazyapp.dto.ProductDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.model.Category;
import com.eazyapp.model.Product;
import com.eazyapp.model.ProductImage;
import com.eazyapp.repository.CategoryRepository;
import com.eazyapp.repository.ProductImageRepository;
import com.eazyapp.repository.ProductRepository;
import com.eazyapp.requestwrapper.ProductRequestWrapper;
import com.eazyapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ProductImageRepository productImageRepository;
	@Autowired
	private CategoryRepository categoryRepository;


	@Override
	public Long createProduct(ProductRequestWrapper productRequestWrapper) throws EazyShoppyException {
		Optional<Product> existingProduct = productRepository.findByName(productRequestWrapper.getName());
		Optional<Category> category=categoryRepository.findById(productRequestWrapper.getCategoryId());
		if (existingProduct.isPresent()) {
			throw new EazyShoppyException("Product with the same name already exists", 400);
		}

		Product product = new Product();
		product.setName(productRequestWrapper.getName());
		product.setBrand(productRequestWrapper.getBrand());
		product.setReviews(productRequestWrapper.getReviews());
		product.setRatings(productRequestWrapper.getRatings());
		product.setProductDescription(productRequestWrapper.getProductDescription());
		product.setOriginalPrice(productRequestWrapper.getOriginalPrice());
		product.setDiscount(productRequestWrapper.getDiscount());
		double ogprice= productRequestWrapper.getOriginalPrice();
		double discount=productRequestWrapper.getDiscount();
		double discoutprice=(ogprice-(ogprice*discount/100));

		product.setDiscountPrice(discoutprice);

		if(category.isPresent()){
			product.setCategory(category.get());
		}else{
			throw new EazyShoppyException("category not exist", 400);
		}


		productRepository.save(product);

		return product.getProductId();
	}

	public void setProductImage( MultipartFile file,Long productId) throws IOException
	{
	Optional<Product> product=productRepository.findById(productId);
	if(product.isPresent()){

		ProductImage image = new ProductImage();
		image.setName(file.getOriginalFilename());
		image.setImage(file.getBytes());
		image.setProduct(product.get());
		productImageRepository.save(image);
	}
	else {
		throw new EazyShoppyException("Product not found", 404);
	}
	}


	@Override
	public ProductDTO getProductById(long id) throws EazyShoppyException {
		Optional<Product> product = productRepository.findById(id);
		if (product.isPresent()) {
			ProductDTO productDTO = new ProductDTO();
			productDTO.setProductDescription(product.get().getProductDescription());
			productDTO.setProductId(product.get().getProductId());
			productDTO.setName(product.get().getName());
			productDTO.setBrand(product.get().getBrand());
			productDTO.setReviews(product.get().getReviews());
			productDTO.setRatings(product.get().getRatings());
			productDTO.setOriginalPrice(product.get().getOriginalPrice());
			productDTO.setDiscount(product.get().getDiscount());
			productDTO.setDiscountedPrice(product.get().getDiscountPrice());
			productDTO.setCategoryId(product.get().getCategory().getId());
			productDTO.setCategoryName(product.get().getCategory().getName());
			return productDTO;
		} else {
			throw new EazyShoppyException("Product not found", 404);
		}
	}

	@Override
	public List<ProductDTO> getAllProducts() throws EazyShoppyException {
		List<Product> products = productRepository.findAll();
		List<ProductDTO> productDTOs = new ArrayList<>();
		for (Product product : products) {
			ProductDTO productDTO = new ProductDTO();
			productDTO.setProductDescription(product.getProductDescription());
			productDTO.setProductId(product.getProductId());
			productDTO.setName(product.getName());
			productDTO.setBrand(product.getBrand());
			productDTO.setReviews(product.getReviews());
			productDTO.setRatings(product.getRatings());
			productDTO.setOriginalPrice(product.getOriginalPrice());
			productDTO.setDiscount(product.getDiscount());
			productDTO.setDiscountedPrice(product.getDiscountPrice());
			productDTO.setCategoryId(product.getCategory().getId());
			productDTO.setCategoryName(product.getCategory().getName());
			productDTOs.add(productDTO);
		}
		return productDTOs;
	}
	@Override
	public List<ProductDTO> getProductByCategoryId(Long categoryId) throws EazyShoppyException {
		List<Product> products = productRepository.findByCategoryId(categoryId);
		List<ProductDTO> productDTOs = new ArrayList<>();
		for (Product product : products) {
			ProductDTO productDTO = new ProductDTO();
			productDTO.setProductDescription(product.getProductDescription());
			productDTO.setProductId(product.getProductId());
			productDTO.setName(product.getName());
			productDTO.setBrand(product.getBrand());
			productDTO.setReviews(product.getReviews());
			productDTO.setRatings(product.getRatings());
			productDTO.setOriginalPrice(product.getOriginalPrice());
			productDTO.setDiscount(product.getDiscount());
			productDTO.setDiscountedPrice(product.getDiscountPrice());
			productDTO.setCategoryId(product.getCategory().getId());
			productDTO.setCategoryName(product.getCategory().getName());
			productDTOs.add(productDTO);
		}
		return productDTOs;
	}
	@Override
	public List<ProductDTO> filterProductByName(String name) throws EazyShoppyException {
		List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
		List<ProductDTO> productDTOs = new ArrayList<>();
		for (Product product : products) {
			ProductDTO productDTO = new ProductDTO();
			productDTO.setProductDescription(product.getProductDescription());
			productDTO.setProductId(product.getProductId());
			productDTO.setName(product.getName());
			productDTO.setBrand(product.getBrand());
			productDTO.setReviews(product.getReviews());
			productDTO.setRatings(product.getRatings());
			productDTO.setOriginalPrice(product.getOriginalPrice());
			productDTO.setDiscount(product.getDiscount());
			productDTO.setDiscountedPrice(product.getDiscountPrice());
			productDTO.setCategoryId(product.getCategory().getId());
			productDTO.setCategoryName(product.getCategory().getName());
			productDTOs.add(productDTO);
		}
		return productDTOs;
	}


	public void deleteProduct(Long id ) throws EazyShoppyException{
		Optional<Product> product = productRepository.findById(id);
		if (product.isEmpty()){
			throw new EazyShoppyException("Product not found", 404);
		}
		productRepository.deleteById(id);
	}

//	public ProductImageDTO getProductImage(Long id) throws EazyShoppyException{
//		List<byte[]> images= productImageRepository.findByProductId(id);
//		ProductImageDTO imageDTO=new ProductImageDTO();
//		imageDTO.setImages(images);
//		System.out.println(images);
//		return imageDTO;
//	}
}