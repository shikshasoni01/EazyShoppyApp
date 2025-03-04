package com.eazyapp.repository;

import com.eazyapp.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    @Query("SELECT a FROM Address a WHERE a.user.id = :userId")
    List<Address> findAddressesByUserId(Long userId);
    @Query("SELECT a FROM Address a WHERE a.id=:id and a.user.id = :userId")
    Optional<Address> findAddressByIdAndUserId(Long id, Long userId);



}