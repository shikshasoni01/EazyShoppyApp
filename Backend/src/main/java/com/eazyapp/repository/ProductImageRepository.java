package com.eazyapp.repository;

import com.eazyapp.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage,Long> {

//    @Query("select pi.image from ProductImage pi where pi.product.id = :productId")
//    List<byte[]> findByProductId(Long productId);
    @Query("select pi.image from ProductImage pi where pi.product.id = :productId")
    byte[] findByProductId(Long productId);

}
