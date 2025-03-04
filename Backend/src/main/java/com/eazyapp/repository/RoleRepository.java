package com.eazyapp.repository;

import com.eazyapp.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    @Query("select r from Role r where r.roleType =?1")
    Optional<Role> getRoleByRoleType(String roleType);
}
