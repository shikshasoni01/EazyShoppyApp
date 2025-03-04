package com.eazyapp.repository;

import com.eazyapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Query("select u from User u where u.email= ?1")
    Optional<User> findUserFromEmail(String email);

    @Query("select u from User u where u.uniqueId=?1")
    User findOneUniqueId(String uniqueId);


}
