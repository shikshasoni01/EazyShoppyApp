package com.eazyapp.repository;


import com.eazyapp.model.UserLoggedIn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLoggedRepository extends JpaRepository<UserLoggedIn,Long> {
}
