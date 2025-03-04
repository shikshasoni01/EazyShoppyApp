package com.eazyapp.controller;

import com.eazyapp.dto.ProductDTO;
import com.eazyapp.exception.EazyShoppyException;
import com.eazyapp.formatter.ResponseFormatter;
import com.eazyapp.repository.ProductImageRepository;
import com.eazyapp.requestwrapper.ProductRequestWrapper;
import com.eazyapp.service.ProductService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

	@Autowired
	private ProductService productService;

	@Autowired
	private ProductImageRepository productImageRepository;

	@PostMapping(value = "/create")
	public ResponseEntity<JSONObject> createProduct(@RequestBody ProductRequestWrapper productRequestWrapper)  throws EazyShoppyException {
		System.out.println("Create product start");
		Long id=productService.createProduct(productRequestWrapper);
		JSONObject data = ResponseFormatter.formatter("Success", 200, "Product created successfully",id);
		System.out.println("Create product end");
		return new ResponseEntity<>(data, HttpStatus.OK);
	}

	@GetMapping("/getAllProducts")
	public ResponseEntity<JSONObject> getAllProducts() {
		System.out.println("Get all products start");
		List<ProductDTO> products = productService.getAllProducts();
		JSONObject data = ResponseFormatter.formatter("Success", 200, "Products listed successfully", products);
		System.out.println("Get all products end");
		return new ResponseEntity<>(data, HttpStatus.OK);
	}

	@GetMapping("/getProductById")
	public ResponseEntity<JSONObject> getProductById(@RequestHeader Long id) throws EazyShoppyException {
		System.out.println("Get product by ID start");
		ProductDTO product = productService.getProductById(id);
		JSONObject data = ResponseFormatter.formatter("Success", 200, "Product retrieved successfully", product);
		System.out.println("Get product by ID end");
		return new ResponseEntity<>(data, HttpStatus.OK);
	}
	@GetMapping("/getProductByCategoryId")
	public ResponseEntity<JSONObject> getProductByCategoryId(@RequestHeader Long categoryId) throws EazyShoppyException {
		System.out.println("Get product by category ID start");
		List<ProductDTO> products = productService.getProductByCategoryId(categoryId);
		JSONObject data = ResponseFormatter.formatter("Success", 200, "Products listed successfully", products);
		System.out.println("Get product by category ID end");
		return new ResponseEntity<>(data, HttpStatus.OK);
	}
	@GetMapping("/filterProductByName")
	public ResponseEntity<JSONObject> filterProductByName(@RequestHeader String name) throws EazyShoppyException {
		System.out.println("filter product by name start");
		List<ProductDTO> products = productService.filterProductByName(name);
		JSONObject data = ResponseFormatter.formatter("Success", 200, "Products listed successfully", products);
		System.out.println("filter product by name  end");
		return new ResponseEntity<>(data, HttpStatus.OK);
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<JSONObject> deleteProduct(@PathVariable Long id) throws EazyShoppyException {
		System.out.println("delete product start");
		productService.deleteProduct(id);
		JSONObject data = ResponseFormatter.formatter("Success", 200, "product deleted successfully");
		System.out.println("delete product end");
		return new ResponseEntity<>(data, HttpStatus.OK);
	}

	@PostMapping("/upload")
	public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,@RequestParam Long productId) throws IOException {
		System.out.println("Create product image start");
		productService.setProductImage(file,productId);
		JSONObject data = ResponseFormatter.formatter("Success", 200, "Product created successfully");
		System.out.println("Create product image end");

		return ResponseEntity.ok("Image uploaded successfully.");
	}

	@GetMapping("/images/{productId}")
	public ResponseEntity<?> getImage(@PathVariable Long productId) {
		byte[] images = productImageRepository.findByProductId(productId);
				return ResponseEntity.ok()
						.contentType(MediaType.IMAGE_JPEG) // Adjust content type as needed
						.body(images);

	}
//	@GetMapping("/images/{productId}")
//	public ResponseEntity<?> getImage(@PathVariable Long productId) {
//		ProductImageDTO images = productService.getProductImage(productId);
////				return ResponseEntity.ok()
////						.contentType(MediaType.IMAGE_JPEG) // Adjust content type as needed
////						.body(images);
//		JSONObject data = ResponseFormatter.formatter("Success", 200, "Products listed successfully", images);
//		return new ResponseEntity<>(data, HttpStatus.OK);
//	}
}